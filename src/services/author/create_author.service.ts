import { prisma } from "../../database/prismaClient";

interface ICreateAuthorService {
    name: string;
    avatar?: string;
}

export class CreateAuthorService {
    async execute({ name, avatar }: ICreateAuthorService) {
        const author = prisma.author.create({
            data: { name, avatar },
        });

        return author;
    }
}
