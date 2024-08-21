import middy from "middy";
import {
  AppResponse,
  _Response,
  connectMongoose,
  closeMongooseConnection,
} from "./util";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { verifyToken } from "./auth";
import { _Project, projectSchema } from "./models/Project";

export const getProjects = async (): Promise<AppResponse> => {
  try {
    await connectMongoose();
    const projects = await projectSchema.find({});
    return AppResponse.createObject(200, projects, null);
  } catch (e) {
    console.log(e);
    return AppResponse.createObject(500, null, e.message);
  } finally {
    await closeMongooseConnection();
  }
};

export const addProject = async (
  event: APIGatewayProxyEvent
): Promise<AppResponse> => {
  try {
    await connectMongoose();
    const data: _Project = event.body ? JSON.parse(event.body) : null;
    if (data) await projectSchema.create(data);
    return await getProjects();
  } catch (e) {
    console.log(e);
    return AppResponse.createObject(500, null, e.message);
  } finally {
    await closeMongooseConnection();
  }
};

export const updateProject = async (
  event: APIGatewayProxyEvent
): Promise<AppResponse> => {
  try {
    await connectMongoose();
    const data: _Project = event.body ? JSON.parse(event.body) : null;
    if (data)
      await projectSchema.updateOne(
        { _id: data._id },
        {
          $set: {
            name: data.name,
            key: data.key,
            type: data.type,
            category: data.category,
            lead: data.lead,
            url: data.url,
          },
        }
      );
    return await getProjects();
  } catch (e) {
    console.log(e);
    return AppResponse.createObject(500, null, e.message);
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
      event.path == `${process.env.VUE_APP_API_URL}/project/list` &&
      event.httpMethod == "GET"
    ) {
      result = await getProjects();
    } else if (
      event.path == `${process.env.VUE_APP_API_URL}/project` &&
      event.httpMethod == "POST"
    ) {
      result = await addProject(event);
    } else if (
      event.path == `${process.env.VUE_APP_API_URL}/project` &&
      event.httpMethod == "PUT"
    ) {
      result = await updateProject(event);
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
