import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TblOfficers } from '../../entity/officers.entity';
import { RegisterOfficer } from 'src/models/req/registerOffice.models';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterOfficerService {

  constructor(
    @InjectRepository(TblOfficers)
    private usersRepository: Repository<TblOfficers>,
  ) {}

//   findAll(): Promise<TblOfficers[]> {
//     return this.usersRepository.find();
//   }

//   findOne(id: string): Promise<TblOfficers | null> {
//     return this.usersRepository.findOneBy({ id });
//   }

//   async remove(id: string): Promise<void> {
//     await this.usersRepository.delete(id);
//   }

  
  async register(registerOfficer: RegisterOfficer){
    const saltOrRounds = 10;
    const  password = registerOfficer.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    try {
        await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(TblOfficers)
        .values([
            {
                id:registerOfficer.id,
                prefix:registerOfficer.prefix,
                firstName: registerOfficer.firstName,
                lastName: registerOfficer.lastName,
                username: registerOfficer.username,
                password: hash,
                jobPosition: registerOfficer.jobPosition,
                status : registerOfficer.status
            }
        ])
        .execute()
        throw new HttpException('Officer Register Succeed', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        error,
         HttpStatus.PAYMENT_REQUIRED
      );
    }
    
  }
}
