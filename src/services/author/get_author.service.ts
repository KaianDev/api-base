import { prisma } from "../../database/prismaClient";

export class GetAuthorService {
    async execute(id: number) {
        const author = await prisma.author.findFirst({
            where: {
                id,
            },
            include: {
                posts: {
                    orderBy: { createAt: "desc" },
                },
            },
        });

        if (!author) throw new Error("Autor não encontrado!");

        return author;
    }
}
