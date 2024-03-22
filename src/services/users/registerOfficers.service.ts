import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TblOfficers } from '../../entity/officers.entity';
import { RegisterOfficer } from 'src/models/req/registerOffice.models';
import * as bcrypt from 'bcrypt';
import { TblAdmins } from 'src/entity/admins.entity';

@Injectable()
export class RegisterOfficerService {

  constructor(
    @InjectRepository(TblAdmins)
    private usersAdminsRepository: Repository<TblAdmins>,
    @InjectRepository(TblOfficers)
    private usersRepository: Repository<TblOfficers>,
  ) { }

  //   findAll(): Promise<TblOfficers[]> {
  //     return this.usersRepository.find();
  //   }

  //   findOne(id: string): Promise<TblOfficers | null> {
  //     return this.usersRepository.findOneBy({ id });
  //   }

  //   async remove(id: string): Promise<void> {
  //     await this.usersRepository.delete(id);
  //   }


  async register(registerOfficer: RegisterOfficer) {
    const saltOrRounds = 10;
    const password = registerOfficer.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const admin: Promise<TblAdmins> = this.usersAdminsRepository.findOneBy({ username : registerOfficer.username });
    try {
      if (admin == null) {
        await this.usersRepository
          .createQueryBuilder()
          .insert()
          .into(TblOfficers)
          .values([
            {
              id: registerOfficer.id,
              prefix: registerOfficer.prefix,
              firstName: registerOfficer.firstName,
              lastName: registerOfficer.lastName,
              username: registerOfficer.username,
              password: hash,
              jobPosition: registerOfficer.jobPosition,
              status: registerOfficer.status
            }
          ])
          .execute()
        return {
          "statusCode": HttpStatus.OK,
          "message": "Officer Register Succeed",
        }
      } else {
        return {
          "statusCode": HttpStatus.BAD_REQUEST,
          "message": "ชื่อผู้ใช้ซำ้กับในระบบกรุณาเปลียนชื่อผู้ใช้ !!!"
        }
      }
    } catch (error) {
      return{
        "statusCode": HttpStatus.BAD_REQUEST,
        "message": "ชื่อผู้ใช้ซำ้กับในระบบกรุณาเปลียนชื่อผู้ใช้ !!!"
      }
    }

  }
}
