import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TblDisease } from 'src/entity/disease.entity';
import { Disease } from 'src/models/req/disease.models';

@Injectable()
export class DiseaseService {

  constructor(
    @InjectRepository(TblDisease)
    private diseaseRepository: Repository<TblDisease>,
  ){}

    findAll(): Promise<TblDisease[]> {
      return this.diseaseRepository.find();
    }

  //   findOne(id: string): Promise<TblOfficers | null> {
  //     return this.usersRepository.findOneBy({ id });
  //   }

    async remove(id: string): Promise<Object> {
      await this.diseaseRepository.delete(id);
      return {
        "statusCode": HttpStatus.OK,
        "message": " Succeed",
      };
    }


  async save(disease:Disease) {
    try {
        await this.diseaseRepository
          .createQueryBuilder()
          .insert()
          .into(TblDisease)
          .values([
            {
              disId:disease.id,
              name:disease.name
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
