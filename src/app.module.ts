import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { LoginService } from './services/users/login.service';
import {TblOfficers} from './entity/officers.entity'
import {Admins} from './entity/admins.entity'
import {Patient} from './entity/patient.entity'
import { RegisterOfficerService } from './services/users/registerOfficers.service';
import { TypeOrmModule } from '@nestjs/typeorm';


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
        Admins,
        Patient
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      TblOfficers,
    ]),
  ],
  controllers: [
    UsersController
  ],
  providers: [
    LoginService,
    RegisterOfficerService,
  ],
})
export class AppModule {}
