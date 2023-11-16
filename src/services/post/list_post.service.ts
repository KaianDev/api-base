import { prisma } from "../../database/prismaClient";

interface ListPostServiceProps {
    skip: number;
    take?: number;
}

export class ListPostService {
    async execute({ skip, take }: ListPostServiceProps) {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
            },
            skip,
            take: take && take,
        });

        if (!posts) throw new Error("Nenhum post para listar!");

        return posts;
    }
}
