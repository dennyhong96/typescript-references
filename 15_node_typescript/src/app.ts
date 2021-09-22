import express, { NextFunction, Request, Response } from "express";

import todoRouter from "./routes/todos";

const app = express();
app.use(express.json());

app.use("/todos", todoRouter);

// Global error handler, called automatically by express, gets err as the first arg
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
