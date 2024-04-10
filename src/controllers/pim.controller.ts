import { Controller, Post, Body,Headers, Get, Query } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DataUserService } from 'src/services/users/dataUser.service';
import { PatientService } from 'src/services/pim/patient.service';
import { Patient } from 'src/models/req/patient.models';

@Controller("api/pim")
export class PimController {
  constructor(
    private readonly patientService:PatientService,
    private readonly dataUserService:DataUserService
  ) {}
  
  @Post("/save/patient")
  createPatient(@Body() patient: Patient): Object{
    return this.patientService.save(patient);
  }

  @Get("/data/officers")
  getDataOfficers(@Query('search') search,@Headers('Authorization') headers: any):Object{
    return this.dataUserService.getIsdataOffice(search);
  }
}
