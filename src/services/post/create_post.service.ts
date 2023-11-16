import { prisma } from "../../database/prismaClient";

interface ICreatePostService {
    authorId: number;
    title: string;
    body: string;
}

export class CreatePostService {
    async execute({ title, authorId, body }: ICreatePostService) {
        const post = await prisma.post.create({
            data: {
                title,
                body,
                authorId,
            },
        });
        
        if (!post) {
            throw new Error("Erro ao adicionar novo post!");
        }

        return post;
    }
}
