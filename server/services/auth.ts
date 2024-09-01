// const axios = require("axios");
// const github = require("./github");
// const { userSchema } = require("../models/User");
// const util = require("../models/Util");

import axios from "axios";
import { getUserDetails, getUserEmail } from "./github";
import userSchema, { _User } from "../models/User";
import { Request, Response } from "express";
import { connectMongoose, closeMongooseConnection } from "../models/Util";
import { Document, Schema } from "mongoose";

export async function login(req: Request, res: Response) {
  try {
    let user: _User | null,
      userDocument: Document | null = null;
    const response = await axios({
      method: "post",
      url: `https://github.com/login/oauth/access_token?client_id=${process.env.VUE_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${req.params.code}&redirect_uri=${process.env.VUE_APP_GITHUB_REDIRECT_URI}`,
      headers: {
        accept: "application/json",
      },
    });

    if (!response.data.error) {
      await connectMongoose();
      user = await new Promise(async (resolve, reject) => {
        let email: { email: string };
        Promise.all(
          [
            getUserDetails(response.data.access_token),
            getUserEmail(response.data.access_token),
          ].map(async (process, p) => {
            if (p == 0) user = await process;
            else email = await process;
          })
        )
          .then(() => {
            if (user) {
              user.email = email["email"];
              resolve(user);
            } else resolve(null);
          })
          .catch(() => {
            resolve(null);
          });
      });

      if (user) {
        const existingUser = await userSchema.findOne({
          email: user.email,
          id: user.id,
        });
        if (!existingUser) {
          userDocument = await userSchema.create(user);
        }

        res.cookie("token", `Bearer ${response.data.access_token}`, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        res.status(200).json(existingUser ? existingUser : userDocument);
      } else {
        res.status(400).json({ error: "Authentication Error!" });
      }
    } else {
      res.status(400).json({ error: "Authentication Error!" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.clearCookie("token");
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
}
