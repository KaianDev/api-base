import { prisma } from "../../database/prismaClient";

export class RemoveAuthorService {
    async execute(id: number) {
        const exists = await prisma.author.findFirst({ where: { id } });

        if (!exists) {
            throw new Error("Autor não encontrado!");
        }

        const author = await prisma.author.delete({
            where: { id: exists.id },
        });

        return author;
    }
}
