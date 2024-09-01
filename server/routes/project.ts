import { Application, Request, Response } from "express";
import { closeMongooseConnection, connectMongoose } from "../models/Util";
import { projectSchema, _Project } from "../models/Project";

const projectInit = (prefix: string, app: Application) => {
  // Get all projects
  app.get(`${prefix}/project`, async (req: Request, res: Response) => {
    try {
      await connectMongoose();
      const projects: _Project[] = await projectSchema.find({});
      res.status(200).send(projects);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

  app.post(`${prefix}/project`, async (req: Request, res: Response) => {
    try {
      await connectMongoose();
      const data: _Project = req.body;
      if (data) await projectSchema.create(data);
      const projects: _Project[] = await projectSchema.find({});
      res.status(200).send(projects);
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: e });
    }
  });
};

export default projectInit;
