import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TblOfficers } from 'src/entity/officers.entity';
import { LogIn } from 'src/models/req/logIn.models';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(TblOfficers)
    private usersRepository: Repository<TblOfficers>,
  ) {}

  

  async getIsLogin(logIn:LogIn): Promise<Object> {
    
    const officer: Promise<TblOfficers> = this.usersRepository.findOneBy({ username : logIn.username });
    if(logIn != null && officer != null){
      const isMatch:boolean = await bcrypt.compare(logIn.password,(await officer).password );
      if(isMatch  ){
        throw new HttpException('Officer Login Succeed', HttpStatus.OK);
      }else{
        throw new HttpException('Officer Login fail', HttpStatus.PAYMENT_REQUIRED);
      }
    }else{
      throw new HttpException('val null', HttpStatus.PAYMENT_REQUIRED);
    }
    
  }
}
