import { prisma } from "../../database/prismaClient";

export class CountPostService {
    async execute() {
        const count = await prisma.post.count();
        
        return count;
    }
}
