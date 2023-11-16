import { prisma } from "../../database/prismaClient";

export class RemovePostService {
    async execute(id: number) {
        const exist = await prisma.post.findFirst({ where: { id } });
        if (!exist) throw new Error("Post não encontrado!");
        const post = await prisma.post.delete({ where: { id: exist.id } });
        return post;
    }
}
