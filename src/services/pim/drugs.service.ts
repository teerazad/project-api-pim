import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TblDrug } from 'src/entity/drug.entity';
import { Drugs } from 'src/models/req/drugs.models';

@Injectable()
export class DrugsService {

  constructor(
    @InjectRepository(TblDrug)
    private drugsRepository: Repository<TblDrug>,
  ){}

    findAll(): Promise<TblDrug[]> {
      return this.drugsRepository.find();
    }

  //   findOne(id: string): Promise<TblOfficers | null> {
  //     return this.usersRepository.findOneBy({ id });
  //   }

    async remove(id: string): Promise<Object> {
      await this.drugsRepository.delete(id);
      return {
        "statusCode": HttpStatus.OK,
        "message": " Succeed",
      };
    }


  async save(drugs:Drugs) {
    try {
        await this.drugsRepository
          .createQueryBuilder()
          .insert()
          .into(TblDrug)
          .values([
            {
              dId:drugs.id,
              name:drugs.name
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
