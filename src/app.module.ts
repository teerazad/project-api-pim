import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { LoginService } from './services/users/login.service';
import {TblOfficers} from './entity/officers.entity'
import {TblAdmins} from './entity/admins.entity'
import {Patient} from './entity/patient.entity'
import { RegisterOfficerService } from './services/users/registerOfficers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterAdminService } from './services/users/registerAdmins.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthService } from './services/users/auth.service';
import { ViewsController } from './controllers/views.controller';
import { DataUserService } from './services/users/dataUser.service';


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
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6h' },
    }),
    TypeOrmModule.forFeature([
      TblOfficers,
      TblAdmins,
    ]),
  ],
  controllers: [
    UsersController,
    ViewsController
  ],
  providers: [
    LoginService,
    AuthService,
    RegisterOfficerService,
    RegisterAdminService,
    DataUserService
  ],
})
export class AppModule {}
