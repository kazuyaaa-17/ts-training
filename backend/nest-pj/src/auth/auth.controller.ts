import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService, private readonly jwtService:JwtService){}

    @Post('register')
    async register(@Body() body: CreateAuthDto){
        return await this.authService.register(body.email,body.password);
    }

    @Post('login')
    async login(@Body() body: CreateAuthDto){
        const user = await this.authService.validateUser(body.email,body.password);
        if (!user) return null;
        return this.jwtService.sign({ sub: user.id, email:user.email});

    }



}
