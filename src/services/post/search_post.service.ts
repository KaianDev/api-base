import { prisma } from "../../database/prismaClient";

interface ISearchPostService {
    q: string;
}

export class SearchPostService {
    async execute({ q }: ISearchPostService) {
        const posts = await prisma.post.findMany({
            where: {
                body: {
                    contains: q,
                    mode: "insensitive",
                },
            },
        });

        return posts;
    }
}
