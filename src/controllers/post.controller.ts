import { Request, Response } from "express";
import { CreatePostService } from "../services/post/create_post.service";
import { ListPostService } from "../services/post/list_post.service";
import { RemovePostService } from "../services/post/remove_post.service";
import { CountPostService } from "../services/post/count_post.service";

export class PostController {
    async create(req: Request, res: Response) {
        try {
            const { authorId, title, body } = req.body as {
                authorId: string;
                title: string;
                body: string;
            };
            if (!authorId || !title || !body) {
                throw new Error(
                    "Alguma informação está faltando, verifique e tente novamente."
                );
            }

            if (isNaN(Number(authorId))) {
                throw new Error("O Id precisa ser um número!");
            }

            const post = await new CreatePostService().execute({
                authorId: Number(authorId),
                body,
                title,
            });
            res.status(201).json({
                error: false,
                message: "Novo post adicionado com sucesso!",
                body: post,
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
            const { start, limit } = req.query as {
                start: string;
                limit: string;
            };

            const posts = await new ListPostService().execute({
                skip: Number(start) || 0,
                take: limit ? Number(limit) : undefined,
            });

            res.json({
                error: false,
                message: "Lista de Post carregada!",
                body: posts,
            });
        } catch (error: any) {
            res.status(400).json({
                error: true,
                message: error.message,
            });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (isNaN(Number(id)))
                throw new Error("O id precisa ser um número");

            const post = await new RemovePostService().execute(Number(id));

            res.json({
                error: false,
                message: "Post excluído com sucesso!",
                body: post,
            });
        } catch (error: any) {
            res.status(400).json({
                error: true,
                message: error.message,
            });
        }
    }

    async count(req: Request, res: Response) {
        const count = await new CountPostService().execute();

        res.json({ count });
    }
}
