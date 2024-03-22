import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { LoginService } from './services/users/login.service';
import {TblOfficers} from './entity/officers.entity'
import {TblAdmins} from './entity/admins.entity'
import {Patient} from './entity/patient.entity'
import { RegisterOfficerService } from './services/users/registerOfficers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterAdminService } from './services/users/registerAdmins.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pimdb',
      entities: [
        TblOfficers,
        TblAdmins,
        Patient
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      TblOfficers,
      TblAdmins,
    ]),
  ],
  controllers: [
    UsersController
  ],
  providers: [
    LoginService,
    RegisterOfficerService,
    RegisterAdminService
  ],
})
export class AppModule {}
