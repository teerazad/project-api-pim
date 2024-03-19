import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from '../services/users/login.service';
import { RegisterOfficerService } from '../services/users/registerOfficers.service';
import { RegisterOfficer } from '../models/req/registerOffice.models';
import { v4 as uuid } from 'uuid';


@Controller("api/users")
export class UsersController {
  constructor(
    private readonly appService: AppService,
    private readonly registerOfficerService: RegisterOfficerService
  ) {}

  @Post("/login")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/register/officers")
  createOfficers(@Body() registerOfficer: RegisterOfficer): Object{
    registerOfficer.id = uuid();
    return this.registerOfficerService.register(registerOfficer);;
  }

  @Post("/register/admins")
  createAdmins(@Body() registerOfficer: RegisterOfficer): string {
    registerOfficer.id = uuid();
    return "ID : " + registerOfficer.id + " , Status : " + registerOfficer.status;
  }
}
