import express from "express";
import cors from "cors";
import router from "./app/routes";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.all("*", (req, res) => {
    const error = {
        message: "Route not found.",
        statusCode: 404,
        method: req.method,
        url: req.originalUrl,
    };
    res.status(404).send(error.message);
});
export default app;
