import { prisma } from "../../database/prismaClient";

export class GetPostService {
    async execute(id: number) {
        const post = await prisma.post.findFirst({ where: { id } });

        return post;
    }
}
