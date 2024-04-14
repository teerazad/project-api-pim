import { Controller, Post, Body,Headers, Get, Param, Query, Delete } from '@nestjs/common';
import { LoginService } from '../services/users/login.service';
import { RegisterOfficerService } from '../services/users/registerOfficers.service';
import { RegisterOfficer } from '../models/req/registerOffice.models';
import { v4 as uuid } from 'uuid';
import { LogIn } from 'src/models/req/logIn.models';
import {  } from 'class-validator';
import { RegisterAdminService } from 'src/services/users/registerAdmins.service';
import { RegisterAdmins } from 'src/models/req/registerAdmin.models';
import { AuthService } from 'src/services/users/auth.service';
import { DataUserService } from 'src/services/users/dataUser.service';

@Controller("api/users")
export class UsersController {
  constructor(
    private readonly appService: LoginService,
    private readonly registerOfficerService: RegisterOfficerService,
    private readonly registerAdminService:RegisterAdminService,
    private readonly authService:AuthService,
    private readonly dataUserService:DataUserService
  ) {}

  @Get("/data/officers")
  getDataOfficers(@Query('search') search,@Headers('Authorization') headers: any):Object{
    return this.dataUserService.getIsdataOffice(search);
  }

  @Get("/data/admin")
  getDataAdmin(@Query('search') search,@Headers('Authorization') headers: any):Object{
    return this.dataUserService.getIsdataAdmin(search);
  }

  @Post("/login")
  getHello(@Body() logIn: LogIn):Object{
    return this.appService.getIsLogin(logIn);
  }

  @Post("/auth")
  getAuth(@Headers('Authorization') headers: any):Object{
    return this.authService.getIsAuth(headers);
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

  @Delete("/del/admins/:id")
  DelAdmins(@Param('id') id: string,@Headers('Authorization') headers: any): Object{
    return this.registerAdminService.remove(id)
  }
}
