import { Application, Request, Response } from "express";

const projectInit = (prefix: string, app: Application) => {
  app.get(`${prefix}/project`, async (req: Request, res: Response) => {
    res.status(200).send([]);
  });
};

export default projectInit;
