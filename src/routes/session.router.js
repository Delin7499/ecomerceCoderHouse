import { Router } from "express";

const sessionRouter = Router();

sessionRouter.get("/", (req, res) => {
  res.send("");
});

export default sessionRouter;
