import axios from "axios";

export async function getUserDetails(token: string) {
  try {
    const response = await axios.get(`${process.env.GITHUB_API_URL}/user`, {
      headers: { Authorization: "Bearer " + token },
      withCredentials: true,
    });
    const user = response.data;
    return response ? user : null;
  } catch (e) {
    return e;
  }
}

export async function getUserEmail(token: string) {
  try {
    const response = await axios.get(
      `${process.env.GITHUB_API_URL}/user/emails`,
      {
        headers: { Authorization: "Bearer " + token },
        withCredentials: true,
      }
    );
    return response
      ? response.data.filter(
          (email: { primary: string }) => email["primary"]
        )[0]
      : null;
  } catch (e) {
    return e;
  }
}
