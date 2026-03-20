import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService){}

    async register(email:string,password:string){
        const hashed:string = await bcrypt.hash(password,10);
        return await this.userService.create(email,hashed);
    }

    async validateUser(email:string,password:string){
        const user = await this.userService.findByEmail(email);
         if (!user) return null;
        const isMatch = await bcrypt.compare(password,user.password);
        
        return isMatch ? user : null;
    }
}
