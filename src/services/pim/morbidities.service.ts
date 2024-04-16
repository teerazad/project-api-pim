import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TblMedicineHtr } from 'src/entity/medicineHistory.entity';
import { Drughty } from 'src/models/req/drughty.models';
import { TblMorbidities } from 'src/entity/CoMorbidities.entity';
import { Morbidities } from 'src/models/req/morbidities.models';

@Injectable()
export class MorbiditiesService {

  constructor(
    @InjectRepository(TblMorbidities)
    private morbiditiesRepository: Repository<TblMorbidities>,
  ){}

  async findAll(): Promise<Object> {
      const user = await this.morbiditiesRepository
                        .createQueryBuilder("morbidities")
                        .leftJoinAndSelect("morbidities.napNo", "napNo")
                        .leftJoinAndSelect("morbidities.disId", "disId")
                        .getMany()
      return user;
    }

  //   findOne(id: string): Promise<TblOfficers | null> {
  //     return this.usersRepository.findOneBy({ id });
  //   }

    async remove(id: string): Promise<Object> {
      await this.morbiditiesRepository.delete(id);
      return {
        "statusCode": HttpStatus.OK,
        "message": " Succeed",
      };
    }


  async save(morbidities:Morbidities) {
    try {
        await this.morbiditiesRepository
          .createQueryBuilder()
          .insert()
          .into(TblMorbidities)
          .values([
            {
              morId:morbidities.id,
              napNo:morbidities.napNo,
              disId:morbidities.disId
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
