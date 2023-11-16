import { Request, Response } from "express";
import { CreateAuthorService } from "../services/author/create_author.service";
import sharp from "sharp";
import { unlink } from "fs/promises";
import { ListAuthorService } from "../services/author/list_author.service";
import { RemoveAuthorService } from "../services/author/remove_author.service";
import path from "path";
import { GetAuthorService } from "../services/author/get_author.service";

export class AuthorController {
    async create(req: Request, res: Response) {
        try {
            const { name } = req.body as { name: string };

            if (!name) throw new Error("É necessário enviar um nome!");

            const avatar = req.file;

            if (avatar) {
                const file = await sharp(avatar?.path)
                    .resize(400, 400)
                    .toFormat("jpeg")
                    .toFile(`./public/avatars/${avatar?.filename}.jpg`);
            }

            const author = await new CreateAuthorService().execute({
                name,
                avatar: avatar ? `avatars/${avatar?.filename}.jpg` : undefined,
            });

            if (avatar) await unlink(avatar.path);

            res.status(201).json({
                error: false,
                message: "Autor Cadastrado!",
                body: author,
            });
        } catch (error: any) {
            res.status(400).json({
                error: true,
                message: error.message,
            });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const authors = await new ListAuthorService().execute();

            res.json({
                error: false,
                message: "Lista carregada com sucesso!",
                body: authors,
            });
        } catch (error: any) {
            res.status(400).json({ error: true, message: error.message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (isNaN(Number(id))) {
                throw new Error("O ID deve ser um número!");
            }

            const author = await new RemoveAuthorService().execute(Number(id));

            await unlink(path.join("./public/" + author.avatar));

            res.json({
                error: false,
                message: `Autor ${author.name} removido!`,
                body: author,
            });
        } catch (error: any) {
            res.json({
                error: true,
                message: error.message,
            });
        }
    }

    async getAuthor(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (isNaN(Number(id)))
                throw new Error("O id precisa ser um número!");

            const author = await new GetAuthorService().execute(Number(id));

            res.json({
                error: false,
                body: author,
            });
        } catch (error: any) {
            res.status(400).json({
                error: true,
                message: error.message,
            });
        }
    }
}
