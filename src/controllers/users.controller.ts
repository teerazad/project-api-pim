import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginService } from '../services/users/login.service';
import { RegisterOfficerService } from '../services/users/registerOfficers.service';
import { RegisterOfficer } from '../models/req/registerOffice.models';
import { v4 as uuid } from 'uuid';
import { LogIn } from 'src/models/req/logIn.models';
import {  } from 'class-validator';
import { RegisterAdminService } from 'src/services/users/registerAdmins.service';
import { RegisterAdmins } from 'src/models/req/registerAdmin.models';

@Controller("api/users")
export class UsersController {
  constructor(
    private readonly appService: LoginService,
    private readonly registerOfficerService: RegisterOfficerService,
    private readonly registerAdminService:RegisterAdminService
  ) {}

  @Post("/login")
  getHello(@Body() logIn: LogIn):Object{
    return this.appService.getIsLogin(logIn);
  }

  @Post("/auth")
  getauth(@Body() logIn: LogIn):Object{
    return this.appService.getIsLogin(logIn);
  }

  @Post("/register/officers")
  createOfficers(@Body() registerOfficer: RegisterOfficer): Object{
    registerOfficer.id = uuid();
    return this.registerOfficerService.register(registerOfficer);;
  }

  @Post("/register/admins")
  createAdmins(@Body() registerAdmins: RegisterAdmins): Object{
    registerAdmins.id = uuid();
    return this.registerAdminService.register(registerAdmins);
  }
}
