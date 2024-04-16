import { Controller, Post, Body,Headers, Get, Query, Param, Delete } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DataUserService } from 'src/services/users/dataUser.service';
import { PatientService } from 'src/services/pim/patient.service';
import { Patient } from 'src/models/req/patient.models';
import { Drugs } from 'src/models/req/drugs.models';
import { DrugsService } from 'src/services/pim/drugs.service';
import { Drughty } from 'src/models/req/drughty.models';
import { DrughtyService } from 'src/services/pim/drughty.service';

@Controller("api/pim")
export class PimController {
  constructor(
    private readonly patientService:PatientService,
    private readonly drugsService:DrugsService,
    private readonly drugshtyService:DrughtyService
  ) {}
  
  @Post("/save/patient")
  createPatient(@Body() patient: Patient): Object{
    return this.patientService.save(patient);
  }
  @Get("/data/patient")
  getDataPatient(@Query('search') search,@Headers('Authorization') headers: any): Object{
    return this.patientService.findAll();
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

  @Post("/save/drughty")
  createDrughty(@Body()  drughty: Drughty): Object{
    drughty.id = uuid();
    return this.drugshtyService.save(drughty);
  }

  @Get("/data/drughty")
  getDataDrughty(@Query('search') search,@Headers('Authorization') headers: any):Object{
    return this.drugshtyService.findAll();
  }

  @Delete("/del/drughty/:id")
  delDrughty(@Param('id') id: string,@Headers('Authorization') headers: any):Object{
    return this.drugshtyService.remove(id);
  }
}
