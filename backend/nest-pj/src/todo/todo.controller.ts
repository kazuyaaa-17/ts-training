import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService:TodoService){}
    @Get()
    findAll(){
        return this.todoService.findAll();
    }

    @Post()
    create(@Body() body:CreateTodoDto){
        return this.todoService.create(body.title);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.todoService.remove(Number(id));
    }

    @Patch(':id/toggle')
    toggleDone(@Param('id') id:string){
        return this.todoService.toggleDone(Number(id));
    }
}
