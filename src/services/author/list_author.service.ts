import { prisma } from "../../database/prismaClient";

export class ListAuthorService {
    async execute() {
        const authors = await prisma.author.findMany();

        if (!authors) {
            throw new Error("Nada para listar");
        }

        return authors;
    }
}
