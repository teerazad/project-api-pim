import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TblMorbidities } from 'src/entity/CoMorbidities.entity';
import { Morbidities } from 'src/models/req/morbidities.models';
import { TblAppointment } from 'src/entity/appointment.entity';
import { Appointment } from 'src/models/req/appointment.models';

@Injectable()
export class AppointmentService {

  constructor(
    @InjectRepository(TblAppointment)
    private appointmentRepository: Repository<TblAppointment>,
  ){}

  async findAll(): Promise<Object> {
      const user = await this.appointmentRepository
                        .createQueryBuilder("appointment")
                        .leftJoinAndSelect("appointment.napNo", "napNo")
                        .getMany()
      return user;
    }

  //   findOne(id: string): Promise<TblOfficers | null> {
  //     return this.usersRepository.findOneBy({ id });
  //   }

    async remove(id: string): Promise<Object> {
      await this.appointmentRepository.delete(id);
      return {
        "statusCode": HttpStatus.OK,
        "message": " Succeed",
      };
    }


  async save(appointment:Appointment) {
    try {
        await this.appointmentRepository
          .createQueryBuilder()
          .insert()
          .into(TblAppointment)
          .values([
            {
              aitId:appointment.id,
              napNo:appointment.napNo,
              aitDt:appointment.aitDt
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
