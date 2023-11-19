import { prisma } from "../../database/prismaClient";

interface ISearchPostService {
    authorId: number;
    search: string;
}

export class SearchPostService {
    async execute({ authorId, search }: ISearchPostService) {
        const posts = await prisma.post.findMany({
            where: {
                authorId,
                body: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        });

        return posts;
    }
}
