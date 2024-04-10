import { Controller, Post, Body,Headers, Get, Query, Param, Delete } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DataUserService } from 'src/services/users/dataUser.service';
import { PatientService } from 'src/services/pim/patient.service';
import { Patient } from 'src/models/req/patient.models';
import { Drugs } from 'src/models/req/drugs.models';
import { DrugsService } from 'src/services/pim/drugs.service';

@Controller("api/pim")
export class PimController {
  constructor(
    private readonly patientService:PatientService,
    private readonly drugsService:DrugsService,
    private readonly dataUserService:DataUserService
  ) {}
  
  @Post("/save/patient")
  createPatient(@Body() patient: Patient): Object{
    return this.patientService.save(patient);
  }

  @Post("/save/drugs")
  createDrugs(@Body() drugs: Drugs): Object{
    drugs.id = uuid();
    return this.drugsService.save(drugs);
  }

  @Get("/data/drugs")
  getDataDrugs(@Query('search') search,@Headers('Authorization') headers: any):Object{
    return this.drugsService.findAll();
  }

  @Delete("/del/drugs/:id")
  delDrugs(@Param('id') id: string,@Headers('Authorization') headers: any):Object{
    return this.drugsService.remove(id);
  }

  @Get("/data/officers")
  getDataOfficers(@Query('search') search,@Headers('Authorization') headers: any):Object{
    return this.dataUserService.getIsdataOffice(search);
  }
}
