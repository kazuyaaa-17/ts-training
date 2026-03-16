import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodoService {
    constructor(private readonly prisma:PrismaService){}

    async findAll(){
        return await this.prisma.todo.findMany();
    }

    async create(title:string){
        return await this.prisma.todo.create({
            data : {
                title: title
            }
        });
    }


    async remove(id:number){
        return await this.prisma.todo.delete({
            where: {
                id:id,
            }
        });
    }

   async toggleDone(id:number){
    const todo = await this.prisma.todo.findUnique({
        where : { id:id},
    });
    if (!todo) throw new Error('Todo not found!');
    return await this.prisma.todo.update({
        where: {id: id},
        data : { done: !todo.done},
   });
}
}
