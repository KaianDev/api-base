import { prisma } from "../../database/prismaClient";

interface ILoginUserService {
    email: string;
    password: string;
}

export class LoginUserService {
    async execute({ email, password }: ILoginUserService) {
        const user = await prisma.user.findFirst({
            where: { email, password },
        });
        return user;
    }
}
