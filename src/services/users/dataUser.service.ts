import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TblOfficers } from 'src/entity/officers.entity';
import { LogIn } from 'src/models/req/logIn.models';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TblAdmins } from 'src/entity/admins.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DataUserService {
  constructor(
    @InjectRepository(TblOfficers)
    private dataOfficersRepository: Repository<TblOfficers>,
    @InjectRepository(TblAdmins)
    private dataAdminsRepository: Repository<TblAdmins>,
    private jwtService: JwtService
  ) {}
  

  

  async getIsdataOffice(search:string): Promise<Object> {
    console.log( `%${``}%`)
    const data = await this.dataOfficersRepository
          .createQueryBuilder('office')
          .where('office.first_name LIKE :firstName OR office.last_name LIKE :lastname', 
          { 
            firstName: `%${search == undefined ?``:search}%`,
            lastname: `%${search == undefined ?``:search}%`,
          })
          .orderBy('office.id', 'DESC')
          .getMany();

      return data;
  }

  async getIsdataAdmin(search:string): Promise<Object> {
    console.log( `%${``}%`)
    const data = await this.dataAdminsRepository
          .createQueryBuilder('admin')
          .where('admin.first_name LIKE :firstName OR admin.last_name LIKE :lastname', 
          { 
            firstName: `%${search == undefined ?``:search}%`,
            lastname: `%${search == undefined ?``:search}%`,
          })
          .orderBy('admin.id', 'DESC')
          .getMany();

      return data;
  }
}