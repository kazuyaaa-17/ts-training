import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma:PrismaService){}
    
    async findByEmail(email:string){
        return await this.prisma.user.findUnique({
            where: { email: email },
        });
    }
    
    async create(email: string, password: string){
        return await this.prisma.user.create({
            data: {
                email: email,
                password: password,
            }
        })
    }



}
