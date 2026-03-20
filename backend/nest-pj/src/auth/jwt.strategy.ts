import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy } from "passport-jwt";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req)=> req?.cookies?.token ?? null
            ]),
            secretOrKey:'secret',
        });
    }

    async validate(payload: { sub: number, email:string} ){
        return { id:payload.sub, email: payload.email };
    }

}