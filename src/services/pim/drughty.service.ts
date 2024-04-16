import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TblMedicineHtr } from 'src/entity/medicineHistory.entity';
import { Drughty } from 'src/models/req/drughty.models';
import { TblPatient } from 'src/entity/patient.entity';

@Injectable()
export class DrughtyService {

  constructor(
    @InjectRepository(TblMedicineHtr)
    private drughtyRepository: Repository<TblMedicineHtr>,
  ){}

  async findAll(): Promise<Object> {
      const user = await this.drughtyRepository
                        .createQueryBuilder("drughty")
                        .leftJoinAndSelect("drughty.napNo", "napNo")
                        .leftJoinAndSelect("drughty.dId", "dId")
                        .getMany()
      return user;
    }

  //   findOne(id: string): Promise<TblOfficers | null> {
  //     return this.usersRepository.findOneBy({ id });
  //   }

    async remove(id: string): Promise<Object> {
      await this.drughtyRepository.delete(id);
      return {
        "statusCode": HttpStatus.OK,
        "message": " Succeed",
      };
    }


  async save(drughty:Drughty) {
    try {
        await this.drughtyRepository
          .createQueryBuilder()
          .insert()
          .into(TblMedicineHtr)
          .values([
            {
              mhId:drughty.id,
              napNo:drughty.napNo,
              dId:drughty.dId
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
