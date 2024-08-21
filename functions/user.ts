import middy from "middy";
import {
  AppResponse,
  _Response,
  connectMongoose,
  closeMongooseConnection,
} from "./util";
import { verifyToken } from "./auth";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { userSchema } from "./models/User";

export const getUsers = async (
  event: APIGatewayProxyEvent
): Promise<AppResponse> => {
  try {
    await connectMongoose();
    const users = await userSchema.find();
    return AppResponse.createObject(200, users, null);
  } catch (e) {
    console.log(e);
    return AppResponse.createObject(e.statusCode, e, e.message);
  } finally {
    await closeMongooseConnection();
  }
};

export const responseHandler = async function (
  event: APIGatewayProxyEvent,
  context: Context
) {
  try {
    let result: AppResponse | null;
    if (
      event.path == `${process.env.VUE_APP_API_URL}/user/list` &&
      event.httpMethod == "GET"
    ) {
      result = await getUsers(event);
    } else {
      return AppResponse.createObject(404, null, "Path doesn't exists");
    }

    if (result) return result;
    else {
      return AppResponse.createObject(
        500,
        null,
        "Unable to response to request!"
      );
    }
  } catch (e) {
    console.log(e);
    return AppResponse.createObject(e.statusCode, e, e.message);
  }
};

export const handler = middy(responseHandler).use(verifyToken());
