import { prisma } from "../../database/prismaClient";

export class GetUserService {
    async execute(id: number) {
        const user = await prisma.user.findFirst({ where: { id } });

        return user;
    }
}
