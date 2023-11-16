import JWT from "jsonwebtoken";
import { Request, Response } from "express";
import { CreateUserService } from "../services/user/create_user.service";
import { prisma } from "../database/prismaClient";
import dotenv from "dotenv";
import { LoginUserService } from "../services/user/login_user.service";

dotenv.config();

export class UserController {
    async create(req: Request, res: Response) {
        try {
            const { name, email, password, administrator } = req.body as {
                name: string;
                email: string;
                password: string;
                administrator?: boolean;
            };

            if (!name || !email || !password)
                throw new Error("Algum dato não enviado");

            const hasUser = await prisma.user.findFirst({ where: { email } });

            if (hasUser) {
                throw new Error("E-mail ja cadastrado!");
            }

            const newUser = await new CreateUserService().execute({
                email,
                name,
                password,
                administrator,
            });

            const token = JWT.sign(
                {
                    user: newUser.name,
                    id: newUser.id,
                    admin: newUser.administrator,
                },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: "2h" }
            );

            res.status(201).json({
                error: false,
                message: "Usuário criado com sucesso!",
                body: token,
            });
        } catch (error: any) {
            res.status(400).json({ error: true, message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body as {
                email: string;
                password: string;
            };

            if (!email || !password) {
                throw new Error("Os campos e-mail e senha são obrigatórios");
            }

            const user = await new LoginUserService().execute({
                email,
                password,
            });

            if (!user) {
                throw new Error("E-mail e/ou Senha inválido(s)!");
            }

            const token = JWT.sign(
                { name: user.name, id: user.id, admin: user.administrator },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: "2h" }
            );

            res.json({
                error: false,
                message: "Usuário Logado com sucesso!",
                body: {
                    token,
                },
            });
        } catch (error: any) {
            res.status(400).json({ error: true, message: error.message });
        }
    }
}
