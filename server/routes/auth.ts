// const { userSchema } = require("../models/User");
// const { closeMongooseConnection, connectMongoose } = require("../models/Util");
// const { login, logout } = require("../services/auth");
import userSchema from "../models/User";
import { connectMongoose, closeMongooseConnection } from "../models/Util";
import { Application, Request, Response } from "express";
import { login, logout } from "../services/auth";

const authInit = (prefix: string, app: Application) => {
  app.get(`${prefix}/auth/login/:code`, async (req: Request, res: Response) => {
    await login(req, res);
  });

  app.get(`${prefix}/auth/logout`, async (req: Request, res: Response) => {
    await logout(req, res);
  });

  app.get(`${prefix}/auth`, async (req: Request, res: Response) => {
    res.status(200).send({ success: true });
  });

  app.get(`${prefix}/auth/users`, async (req: Request, res: Response) => {
    try {
      await connectMongoose();
      const users = await userSchema.find();
      res.status(200).send(users);
    } catch (e) {
      console.log(e);
      res.status(500).send({ data: null, error: e });
    }
  });
};

export default authInit;
