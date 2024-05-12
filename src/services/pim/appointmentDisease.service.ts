import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TblMorbidities } from 'src/entity/CoMorbidities.entity';
import { Morbidities } from 'src/models/req/morbidities.models';
import { TblAppointment } from 'src/entity/appointment.entity';
import { Appointment } from 'src/models/req/appointment.models';
import { TblAppointmentDisease } from 'src/entity/appointmentDisease.entity';
import { AppointmentDisease } from 'src/models/req/appointmentDisease.models';

@Injectable()
export class AppointmentDiseaseService {

  constructor(
    @InjectRepository(TblAppointmentDisease)
    private appointmentDiseaseRepository: Repository<TblAppointmentDisease>,
  ){}

  async findAll(): Promise<Object> {
      const user = await this.appointmentDiseaseRepository
                        .createQueryBuilder("appointment")
                        .leftJoinAndSelect("appointment.napNo", "napNo")
                        .getMany()
      return user;
    }

  //   findOne(id: string): Promise<TblOfficers | null> {
  //     return this.usersRepository.findOneBy({ id });
  //   }

    async remove(id: string): Promise<Object> {
      await this.appointmentDiseaseRepository.delete(id);
      return {
        "statusCode": HttpStatus.OK,
        "message": " Succeed",
      };
    }


  async save(appointmentDisease:AppointmentDisease) {
    try {
        await this.appointmentDiseaseRepository
          .createQueryBuilder()
          .insert()
          .into(TblAppointmentDisease)
          .values([
            {
              aitId:appointmentDisease.id,
              napNo:appointmentDisease.napNo,
              aitDt:appointmentDisease.aitDt,
              type:appointmentDisease.type,
              checkType:appointmentDisease.checkType,
              other:appointmentDisease.other
            }
          ])
          .execute()
        return {
          "statusCode": HttpStatus.OK,
          "message": " Succeed",
        }
    } catch (error) {
      return{
        "statusCode": HttpStatus.BAD_REQUEST,
        "message": "ชื่อผู้ใช้ซำ้กับในระบบกรุณาเปลียนชื่อผู้ใช้ !!!"
      }
    }

  }
}
