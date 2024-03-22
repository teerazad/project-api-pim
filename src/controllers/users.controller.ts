import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginService } from '../services/users/login.service';
import { RegisterOfficerService } from '../services/users/registerOfficers.service';
import { RegisterOfficer } from '../models/req/registerOffice.models';
import { v4 as uuid } from 'uuid';
import { LogIn } from 'src/models/req/logIn.models';
import {  } from 'class-validator';

@Controller("api/users")
export class UsersController {
  constructor(
    private readonly appService: LoginService,
    private readonly registerOfficerService: RegisterOfficerService
  ) {}

  @Post("/login")
  getHello(@Body() logIn: LogIn):Object{

    return this.appService.getIsLogin(logIn);
  }

  @Post("/register/officers")
  createOfficers(@Body() registerOfficer: RegisterOfficer): Object{
    registerOfficer.id = uuid();
    return this.registerOfficerService.register(registerOfficer);;
  }

  @Post("/register/admins")
  createAdmins(@Body() registerOfficer: RegisterOfficer): Object{
    registerOfficer.id = uuid();
    return "ID : " + registerOfficer.id + " , Status : " + registerOfficer.status;
  }
}
