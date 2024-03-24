import { ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TblOfficers } from 'src/entity/officers.entity';
import { LogIn } from 'src/models/req/logIn.models';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TblAdmins } from 'src/entity/admins.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class AuthService {
    reflector: any;
    constructor(
        @InjectRepository(TblOfficers)
        private loginOfficersRepository: Repository<TblOfficers>,
        @InjectRepository(TblAdmins)
        private loginAdminsRepository: Repository<TblAdmins>,
        private jwtService: JwtService
    ) { }



    async getIsAuth(context: any): Promise<Object> {
       
        if (!context) {
            return {context};
        }else{
            const token:string = context.split(' ')[1];
            const payload = await this.jwtService.verifyAsync(
                token,
                {secret: jwtConstants.secret}
            );
            console.log((await payload)!== null)
            const officer: Promise<TblOfficers | null> = this.loginOfficersRepository.findOneBy({username: (await payload).username });
            const admin: Promise<TblAdmins | null> = this.loginAdminsRepository.findOneBy({ id:(await payload).id,username: payload.username });
            
            if ((await payload)!== null && ((await officer) !== null || (await officer) !== null)) {
                const pass: string = (await officer) !== null ? (await officer).password : (await admin).password;
                if ((await payload).password === pass) {
                    return {
                        "statusCode": HttpStatus.OK,
                        "message": 'Auth Succeed',
                    };
                } else {
                    throw new HttpException('Auth Fail', HttpStatus.BAD_REQUEST);
                }
            } else {
                throw new HttpException('val null', HttpStatus.BAD_REQUEST);
            }
    
        }
    }
    extractTokenFromHeader(request: any) {
        throw new Error('Method not implemented.');
    }
}