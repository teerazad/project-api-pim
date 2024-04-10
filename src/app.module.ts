import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { LoginService } from './services/users/login.service';
import {TblOfficers} from './entity/officers.entity'
import {TblAdmins} from './entity/admins.entity'
import { TblPatient} from './entity/patient.entity'
import { RegisterOfficerService } from './services/users/registerOfficers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterAdminService } from './services/users/registerAdmins.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthService } from './services/users/auth.service';
import { ViewsController } from './controllers/views.controller';
import { DataUserService } from './services/users/dataUser.service';
import { TblDrug } from './entity/drug.entity';
import { TblMedicineHtr } from './entity/medicineHistory.entity';
import { TblDisease } from './entity/disease.entity';
import { TblMorbidities } from './entity/CoMorbidities.entity';
import { TblAppointmentMedicine } from './entity/appointmentMedicine.entity';
import { TblAppointmentDisease } from './entity/appointmentDisease.entity';
import { TblAppointment } from './entity/appointment.entity';
import { PimController } from './controllers/pim.controller';
import { PatientService } from './services/pim/patient.service';
import { DrugsService } from './services/pim/drugs.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'MYSQL_PIM',
      port: 3306,
      username: 'root',
      password: 'my-secret-pw',
      database: 'pimdb',
      entities: [
        TblOfficers,
        TblAdmins,
        TblPatient,
        TblDrug,
        TblMedicineHtr,
        TblDisease,
        TblMorbidities,
        TblAppointmentMedicine,
        TblAppointmentDisease,
        TblAppointment
      ],
      synchronize: true,
      dropSchema: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6h' },
    }),
    TypeOrmModule.forFeature([
      TblOfficers,
      TblAdmins,
      TblPatient,
      TblDrug,
      TblMedicineHtr,
      TblDisease,
      TblMorbidities,
      TblAppointmentMedicine,
      TblAppointmentDisease,
      TblAppointment

    ]),
  ],
  controllers: [
    UsersController,
    ViewsController,
    PimController
  ],
  providers: [
    LoginService,
    AuthService,
    RegisterOfficerService,
    RegisterAdminService,
    DataUserService,
    PatientService,
    DrugsService
  ],
})
export class AppModule {}
