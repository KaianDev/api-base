import { prisma } from "../../database/prismaClient";

interface ICreatePostService {
    authorId: number;
    title: string;
    body: string;
    userId: number;
}

export class CreatePostService {
    async execute({ title, authorId, body, userId }: ICreatePostService) {
        const post = await prisma.post.create({
            data: {
                title,
                body,
                authorId,
                userId,
            },
        });

        if (!post) {
            throw new Error("Erro ao adicionar novo post!");
        }

        return post;
    }
}
