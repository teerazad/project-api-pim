import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TblOfficers } from '../../entity/officers.entity';
import { RegisterOfficer } from 'src/models/req/registerOffice.models';

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
    try {
        await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(TblOfficers)
        .values([
            {
                id:registerOfficer.id,
                firstName: registerOfficer.firstName,
                lastName: registerOfficer.lastName,
                username: registerOfficer.username,
                paasword: registerOfficer.password,
                jobPosition: registerOfficer.jobPosition,
                status : registerOfficer.status
            }
        ])
        .execute()
        return {status:"ok"};
    } catch (error) {
        return error;
    }
    
  }
}
