import axios from "axios";
import mongoose, { ObjectId } from "mongoose";
import { _User } from "../models/User";
import { APIGatewayProxyEvent } from "aws-lambda";
import { _Branch, _Repository } from "../models/Repository";

const getUserDetails = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.VUE_APP_GITHUB_API_URL}/user`,
      {
        headers: { Authorization: "Bearer " + token },
        withCredentials: true,
      }
    );
    const user = response.data;
    return response ? user : null;
  } catch (e) {
    return e;
  }
};

const getUserEmail = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.VUE_APP_GITHUB_API_URL}/user/emails`,
      {
        headers: { Authorization: "Bearer " + token },
        withCredentials: true,
      }
    );
    return response
      ? response.data.filter(
          (email) => email["primary"]
        )[0]
      : null;
  } catch (e) {
    return e;
  }
};

// const getUserRepositories = async (
//   event: APIGatewayProxyEvent
// ): Promise<_Repository[]> => {
//   try {
//     const cookies = cookie.parse(
//       event.headers.cookie ? event.headers.cookie : ""
//     );
//     let userRepositories: _Repository[] = [],
//       pageCount = 1;
//     if (cookies.token && cookies["local._token"]) {
//       let repositoryResponse = { data: [] };
//       do {
//         // Get Repository
//         repositoryResponse = await axios.get(
//           `https://api.github.com/user/repos?type=all&per_page=100&page=${pageCount}`,
//           {
//             headers: {
//               Authorization: `Bearer ${cookies.token}${cookies["local._token"]}`,
//               "X-GitHub-Api-Version": "2022-11-28",
//             },
//           }
//         );
//         userRepositories.push(...repositoryResponse.data);
//         ++pageCount;
//       } while (repositoryResponse.data.length != 0);
//       userRepositories.sort((a, b) => a.name.localeCompare(b.name));
//       return userRepositories;
//     } else return [];
//   } catch (e) {
//     console.log(e);
//     return [];
//   }
// };

// const getRepositoryBranches = async (
//   event: APIGatewayProxyEvent
// ): Promise<_Branch[]> => {
//   try {
//     const cookies = cookie.parse(
//       event.headers.cookie ? event.headers.cookie : ""
//     );
//     let branches: _Branch[] = [],
//       branchResponse = { data: [] };

//     // Get branches for the repository
//     if (event.queryStringParameters?.repo) {
//       let pageCount = 1;
//       if (cookies.token && cookies["local._token"]) {
//         do {
//           branchResponse = await axios.get(
//             `https://api.github.com/repos/${event.queryStringParameters?.repo}/branches?per_page=100&page=${pageCount}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${cookies.token}${cookies["local._token"]}`,
//                 "X-GitHub-Api-Version": "2022-11-28",
//               },
//             }
//           );

//           branches.push(...branchResponse.data);
//           ++pageCount;
//         } while (branchResponse.data.length != 0);
//       }
//       return branches;
//     } else return [];
//   } catch (e) {
//     console.log(e);
//     return [];
//   }
// };

export default {
  getUserDetails,
  getUserEmail,
  // getUserRepositories,
  // getRepositoryBranches,
};