export async function getUserDetails(token: string) {
  try {
    const user = await (
      await fetch(`${process.env.GITHUB_API_URL}/user`, {
        headers: { Authorization: "Bearer " + token },
        credentials: "include",
      })
    ).json();
    return user ? user : null;
  } catch (e) {
    return e;
  }
}

export async function getUserEmail(token: string) {
  try {
    const response = await (
      await fetch(`${process.env.GITHUB_API_URL}/user/emails`, {
        headers: { Authorization: "Bearer " + token },
        credentials: "include",
      })
    ).json();
    return response
      ? response.filter((email: { primary: string }) => email["primary"])[0]
      : null;
  } catch (e) {
    return e;
  }
}
