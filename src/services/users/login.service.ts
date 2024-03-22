import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TblOfficers } from 'src/entity/officers.entity';
import { LogIn } from 'src/models/req/logIn.models';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TblAdmins } from 'src/entity/admins.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(TblOfficers)
    private usersOfficersRepository: Repository<TblOfficers>,
    @InjectRepository(TblAdmins)
    private usersAdminsRepository: Repository<TblAdmins>,
  ) {}
  

  

  async getIsLogin(logIn:LogIn): Promise<Object> {
    
    const officer: Promise<TblOfficers> = this.usersOfficersRepository.findOneBy({ username : logIn.username });
    const admin: Promise<TblOfficers> = this.usersAdminsRepository.findOneBy({ username : logIn.username });
    if(logIn != null && (officer != null ||admin != null)){
      const pass: string = officer != null ? (await officer).password : (await admin).password;
      const isMatch:boolean = await bcrypt.compare(logIn.password, pass);
      if(isMatch  ){
        throw new HttpException('Officer Login Succeed', HttpStatus.OK);
      }else{
        throw new HttpException('Officer Login fail', HttpStatus.BAD_REQUEST);
      }
    }else{
      throw new HttpException('val null', HttpStatus.BAD_REQUEST);
    }
    
  }
}
