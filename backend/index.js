import express from "express";
import userRouter from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(
   cors({
      origin: "*",
   })
);
app.options("*", cors());
app.get(`/`, (req, res) => {
   res.send("Server runned successfully");
});
app.use("/api", userRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
