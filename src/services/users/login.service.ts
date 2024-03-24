import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TblOfficers } from 'src/entity/officers.entity';
import { LogIn } from 'src/models/req/logIn.models';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TblAdmins } from 'src/entity/admins.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(TblOfficers)
    private loginOfficersRepository: Repository<TblOfficers>,
    @InjectRepository(TblAdmins)
    private loginAdminsRepository: Repository<TblAdmins>,
    private jwtService: JwtService
  ) {}
  

  

  async getIsLogin(logIn:LogIn): Promise<Object> {
    
    const officer: Promise<TblOfficers|null> = this.loginOfficersRepository.findOneBy({ username : logIn.username });
    const admin: Promise<TblAdmins|null> = this.loginAdminsRepository.findOneBy({ username : logIn.username });

    console.log((await officer)!==null)
    console.log((await admin)!==null)
    console.log((await officer).password)

    if(logIn != null && ((await officer) !== null || (await admin) !== null )){

      const pass:string = (await officer) !== null ? (await officer).password : (await admin).password;
      const isMatch:boolean = await bcrypt.compare(logIn.password, pass);
      if(isMatch){
        const payload = { 
          id: (await officer) !== null ? (await officer).id : (await admin).id, 
          username: (await officer) !== null ? (await officer).username : (await admin).username,
          password : (await officer) !== null ? (await officer).password : (await admin).password
        };
        return {
          "statusCode": HttpStatus.OK,
          "message":'Login Succeed',
          "status": (await officer) !== null ? (await officer).status : (await admin).status,
          "access_token" : await this.jwtService.signAsync(payload),
        };

      }else{
        throw new HttpException('Login fail', HttpStatus.BAD_REQUEST);
      }
    }else{
      throw new HttpException('val null', HttpStatus.BAD_REQUEST);
    }
    
  }
}
