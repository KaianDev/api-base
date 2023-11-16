import { prisma } from "../../database/prismaClient";

interface ICreateUserService {
    email: string;
    name: string;
    password: string;
    administrator?: boolean;
}

export class CreateUserService {
    async execute({
        email,
        name,
        password,
        administrator,
    }: ICreateUserService) {
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password,
                administrator,
            },
        });

        return user;
    }
}
