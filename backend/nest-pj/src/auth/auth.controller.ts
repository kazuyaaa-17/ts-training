import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService, private readonly jwtService:JwtService){}

    @Post('register')
    async register(@Body() body: CreateAuthDto){
        return await this.authService.register(body.email,body.password);
    }

    @Post('login')
    async login(@Body() body: CreateAuthDto, @Res() res:Response){
        const user = await this.authService.validateUser(body.email,body.password);
        if (!user) return res.status(401).send({message: 'Authorization Error'});
        const token = this.jwtService.sign({ sub: user.id, email:user.email});
        res.cookie(
            'token',token,{
                httpOnly:true,
                sameSite:'none',
                secure:true,
            }
        );
        return res.send({ok:true});
    }

    @Post('logout')
    logout(@Res() res:Response){
        res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true });
        return res.send({ok:true});

    }

}
