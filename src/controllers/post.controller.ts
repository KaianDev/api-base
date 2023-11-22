import { Request, Response } from "express";
import { CreatePostService } from "../services/post/create_post.service";
import { ListPostService } from "../services/post/list_post.service";
import { RemovePostService } from "../services/post/remove_post.service";
import { CountPostService } from "../services/post/count_post.service";
import { GetUserService } from "../services/user/get_user.service";
import { GetPostService } from "../services/post/getpost_service";
import { SearchPostService } from "../services/post/search_post.service";

export class PostController {
    async create(req: Request, res: Response) {
        try {
            const { authorId, title, body, userId } = req.body as {
                authorId: string;
                title: string;
                body: string;
                userId: string;
            };

            if (!authorId || !title || !body || !userId) {
                throw new Error(
                    "Alguma informação está faltando, verifique e tente novamente."
                );
            }

            const hasUser = await new GetUserService().execute(Number(userId));

            if (!hasUser) {
                throw new Error("Usuário não encontrado!");
            }

            if (isNaN(Number(authorId))) {
                throw new Error("O Id precisa ser um número!");
            }

            const post = await new CreatePostService().execute({
                authorId: Number(authorId),
                body,
                title,
                userId: Number(userId),
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

    async getPost(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id || isNaN(Number(id))) throw new Error("ID inválido");

            const post = await new GetPostService().execute(Number(id));

            res.json({
                body: post,
            });
        } catch (error: any) {
            res.status(400).json({
                error: true,
                message: error.message,
            });
        }
    }

    async search(req: Request, res: Response) {
        try {
            const search = req.query.q as string;

            if (!search) return;

            const posts = await new SearchPostService().execute({
                q: search,
            });

            if (!posts || posts.length === 0)
                throw new Error(`Nenhum resultado encontrado para ${search}`);

            res.json({
                error: false,
                body: posts,
            });
        } catch (error: any) {
            res.status(400).json({
                error: true,
                message: error.message,
            });
        }
    }
}
