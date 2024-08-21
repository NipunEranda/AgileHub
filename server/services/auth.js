const axios = require("axios");
exports.login = async (code) => {
  try {
    const response = await axios({
      method: "post",
      url: `https://github.com/login/oauth/access_token?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}`,
      headers: {
        accept: "application/json",
      },
    });

    console.log(response);

    // res.cookie('token', `Bearer ${response.data.access_token}`, { httpOnly: true, secure: true, sameSite: 'strict' });

    if (!response.data.error) {
    }
    return null;
  } catch (e) {
    console.log(e);
    // return AppResponse.createObject(500, e, e.message);
  } finally {
    // await closeMongooseConnection();
  }
};
