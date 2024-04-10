import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/models/req/patient.models';
import { TblPatient } from 'src/entity/patient.entity';

@Injectable()
export class PatientService {

  constructor(
    @InjectRepository(TblPatient)
    private patientRepository: Repository<TblPatient>,
  ){}

  //   findAll(): Promise<TblOfficers[]> {
  //     return this.usersRepository.find();
  //   }

  //   findOne(id: string): Promise<TblOfficers | null> {
  //     return this.usersRepository.findOneBy({ id });
  //   }

  //   async remove(id: string): Promise<void> {
  //     await this.usersRepository.delete(id);
  //   }


  async save(patient: Patient) {
    try {
        await this.patientRepository
          .createQueryBuilder()
          .insert()
          .into(TblPatient)
          .values([
            {
              napNo:patient.napNo,
              prefix: patient.prefix,
              firstName: patient.firstName,
              lastName: patient.lastName,
              nickname: patient.nickname,
              birthday: patient.birthday,
              age: patient.age,
              hn: patient.hn,
              idcard:patient.idcard,
              phoneNumber: patient.phoneNumber,
              weight:patient.weight,
              height: patient.height,
              job: patient.job,
              ucepId: patient.ucepId,
              name: patient.name
            }
          ])
          .execute()
        return {
          "statusCode": HttpStatus.OK,
          "message": "Officer Register Succeed",
        }
    } catch (error) {
      return{
        "statusCode": HttpStatus.BAD_REQUEST,
        "message": "ชื่อผู้ใช้ซำ้กับในระบบกรุณาเปลียนชื่อผู้ใช้ !!!"
      }
    }

  }
}
