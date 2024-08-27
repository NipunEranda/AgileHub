const axios = require("axios");
const github = require("./github");
const { userSchema } = require("../models/User");
const util = require("../models/Util");

exports.login = async (req, res) => {
  try {
    let user;
    const response = await axios({
      method: "post",
      url: `https://github.com/login/oauth/access_token?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${req.params.code}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}`,
      headers: {
        accept: "application/json",
      },
    });

    if (!response.data.error) {
      await util.connectMongoose();
      user = await new Promise(async (resolve, reject) => {
        let email;
        Promise.all(
          [
            github.getUserDetails(response.data.access_token),
            github.getUserEmail(response.data.access_token),
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
          user = await userSchema.create(user);
        }
        res.cookie("token", `Bearer ${response.data.access_token}`, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        res.cookie(
          "user",
          Buffer.from(JSON.stringify(user)).toString("base64"),
          {
            secure: true,
            sameSite: "strict",
          }
        );

        res.status(200).json({ message: "Authentication Success!" });
      } else {
        res.status(400).json({ error: "Authentication Error!" });
      }
    } else {
      res.status(400).json({ error: "Authentication Error!" });
    }
  } catch (e) {
    console.log(e);
    return { status: 500, error: e.message };
  } finally {
    util.closeMongooseConnection();
  }
};
