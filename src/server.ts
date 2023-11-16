import express, { Request, Response, ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import router from "./routes";
import path = require("path");
import { MulterError } from "multer";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = express();
server.use(cors());
server.use(express.static(path.join("./public")));
server.use(express.json());

server.use(router);

server.use((req: Request, res: Response) => {
    res.status(404).json("Página não encontrada!");
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400);
    if (err instanceof MulterError) {
        console.log(err.code);
        res.json({ error: err.code });
    } else {
        console.log(err);
        res.json({ error: "Ocorreu algum erro!" });
    }
};
server.use(errorHandler);

server.listen(PORT, () => console.log(`Servidor rodando na Porta:${PORT}`));
