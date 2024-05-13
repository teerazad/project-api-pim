import { Controller, Post, Body,Headers, Get, Query, Param, Delete, Res, StreamableFile, Header } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PatientService } from 'src/services/pim/patient.service';
import { Patient } from 'src/models/req/patient.models';
import { Drugs } from 'src/models/req/drugs.models';
import { DrugsService } from 'src/services/pim/drugs.service';
import { Drughty } from 'src/models/req/drughty.models';
import { DrughtyService } from 'src/services/pim/drughty.service';
import { Disease } from 'src/models/req/disease.models';
import { DiseaseService } from 'src/services/pim/disease.service';
import { MorbiditiesService } from 'src/services/pim/morbidities.service';
import { Morbidities } from 'src/models/req/morbidities.models';
import { Appointment } from 'src/models/req/appointment.models';
import { AppointmentService } from 'src/services/pim/appointment.service';
import { createReadStream } from 'fs';
const mime = require('mime')
const path = require('path')
import { join } from 'path';
import { AppointmentDiseaseService } from 'src/services/pim/appointmentDisease.service';
import { AppointmentDisease } from 'src/models/req/appointmentDisease.models';
const fs = require('fs').promises;


@Controller("api/pim")
export class PimController {
  constructor(
    private readonly patientService:PatientService,
    private readonly drugsService:DrugsService,
    private readonly drugshtyService:DrughtyService,
    private readonly diseaseService:DiseaseService,
    private readonly morbiditiesService:MorbiditiesService,
    private readonly appointmentService:AppointmentService,
    private readonly appointmentDiseaseService:AppointmentDiseaseService
  ) {}
  
  @Post("/save/patient")
  createPatient(@Body() patient: Patient): Object{
    return this.patientService.save(patient);
  }

  @Get("/data/patient")
  getDataPatient(@Query('search') search,@Headers('Authorization') headers: any): Object{
    this.patientService.patientExcel()
    return this.patientService.findAll();
  }

  @Get("/data/patient/excel")
  @Header('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-disposition', 'attachment; filename="pim.xlsx"')
  getDataPatientExcel(@Query('search') search,@Headers('Authorization') headers: any): StreamableFile{
    try {

      if(this.patientService.patientExcel()){
        const file = createReadStream(join(process.cwd(), 'public/excel/Excel.xlsx'));
        console.log(file)
        return new StreamableFile(file);
      }
    } catch (err) {
      console.error(err.message);
    }
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

  @Post("/save/disease")
  createDisease(@Body()  disease: Disease): Object{
    disease.id = uuid();
    return this.diseaseService.save(disease);
  }

  @Get("/data/disease")
  getDataDisease(@Query('search') search,@Headers('Authorization') headers: any):Object{
    return this.diseaseService.findAll();
  }

  @Delete("/del/disease/:id")
  delDisease(@Param('id') id: string,@Headers('Authorization') headers: any):Object{
    return this.diseaseService.remove(id);
  }

  @Post("/save/morbidities")
  createMorbidities(@Body()  morbidities:Morbidities): Object{
    morbidities.id = uuid();
    return this.morbiditiesService.save(morbidities);
  }

  @Get("/data/morbidities")
  getDataMorbidities(@Query('search') search,@Headers('Authorization') headers: any):Object{
    return this.morbiditiesService.findAll();
  }

  @Delete("/del/morbidities/:id")
  delMorbidities(@Param('id') id: string,@Headers('Authorization') headers: any):Object{
    return this.morbiditiesService.remove(id);
  }

  @Post("/save/appointment")
  createAppointment(@Body()  appointment:Appointment): Object{
    appointment.id = uuid();
    return this.appointmentService.save(appointment);
  }

  @Get("/data/appointment")
  getDataAppointment(@Query('search') search,@Headers('Authorization') headers: any):Object{
    return this.appointmentService.findAll();
  }

  @Delete("/del/appointment/:id")
  delAppointment(@Param('id') id: string,@Headers('Authorization') headers: any):Object{
    return this.appointmentService.remove(id);
  }

  @Post("/save/appointmentDisease")
  createAppointmentDisease(@Body()  appointmentDisease:AppointmentDisease): Object{
    appointmentDisease.id = uuid();
    return this.appointmentDiseaseService.save(appointmentDisease);
  }

  @Get("/data/appointmentDisease")
  getDataAppointmentDisease(@Query('search') search,@Headers('Authorization') headers: any):Object{
    return this.appointmentDiseaseService.findAll();
  }

  @Delete("/del/appointmentDisease/:id")
  delAppointmentDisease(@Param('id') id: string,@Headers('Authorization') headers: any):Object{
    return this.appointmentDiseaseService.remove(id);
  }
}
