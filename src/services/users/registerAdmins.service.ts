import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TblOfficers } from '../../entity/officers.entity';
import * as bcrypt from 'bcrypt';
import { TblAdmins } from 'src/entity/admins.entity';
import { RegisterAdmins } from 'src/models/req/registerAdmin.models';

@Injectable()
export class RegisterAdminService {

  constructor(
    @InjectRepository(TblAdmins)
    private usersAdminsRepository: Repository<TblAdmins>,
    @InjectRepository(TblOfficers)
    private usersOfficersRepository: Repository<TblOfficers>,
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

  
  async register(registerAdmins: RegisterAdmins){
    const saltOrRounds = 10;
    const  password = registerAdmins.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const officer: Promise<TblOfficers> = this.usersOfficersRepository.findOneBy({ username : registerAdmins.username });
  
    
    try {
      if(officer == null){
        await this.usersAdminsRepository
        .createQueryBuilder()
        .insert()
        .into(TblAdmins)
        .values([
            {
                id:registerAdmins.id,
                prefix:registerAdmins.prefix,
                firstName: registerAdmins.firstName,
                lastName: registerAdmins.lastName,
                username: registerAdmins.username,
                password: hash,
                jobPosition: registerAdmins.jobPosition,
                status : registerAdmins.status
            }
        ])
        .execute()
        return {
          "statusCode":  HttpStatus.OK,
          "message": "Officer Register Succeed",
         }
      }else{
        return {
          "statusCode": HttpStatus.BAD_REQUEST,
          "message": "ชื่อผู้ใช้ซำ้กับในระบบกรุณาเปลียนชื่อผู้ใช้ !!!"
        }
      }
    } catch (error) {
      return {
        "statusCode": HttpStatus.BAD_REQUEST,
        "message": "ชื่อผู้ใช้ซำ้กับในระบบกรุณาเปลียนชื่อผู้ใช้ !!!"
      }
    };
    
  }
}