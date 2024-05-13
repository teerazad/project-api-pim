import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/models/req/patient.models';
import { TblPatient } from 'src/entity/patient.entity';
import { TblMedicineHtr } from 'src/entity/medicineHistory.entity';
import { join } from 'path';
import { TblMorbidities } from 'src/entity/CoMorbidities.entity';
import { TblAppointmentDisease } from 'src/entity/appointmentDisease.entity';
import { TblAppointment } from 'src/entity/appointment.entity';
var xl = require('excel4node');
const fs = require('fs').promises;

@Injectable()
export class PatientService {

  constructor(
    @InjectRepository(TblPatient)
    private patientRepository: Repository<TblPatient>,
    @InjectRepository(TblMedicineHtr)
    private drughtyRepository: Repository<TblMedicineHtr>,
    @InjectRepository(TblMorbidities)
    private morbiditiesRepository: Repository<TblMorbidities>,
    @InjectRepository(TblAppointmentDisease)
    private appointmentDiseaseRepository: Repository<TblAppointmentDisease>,
    @InjectRepository(TblAppointment)
    private appointmentRepository: Repository<TblAppointment>,
  ) { }

  async findAll(): Promise<TblPatient[]> {
    const user = await this.patientRepository
    .createQueryBuilder("patient")
    .leftJoinAndSelect("patient.morbidities", "morbidities")
    .leftJoinAndSelect("patient.medicineHtr", "medicineHtr")
    .leftJoinAndSelect("patient.appointmentDisease", "appointmentDisease")
    .getMany()

    return user;
    // return this.patientRepository.find();
  }

  //   findOne(id: string): Promise<TblOfficers | null> {
  //     return this.usersRepository.findOneBy({ id });
  //   }

    async remove(id: string): Promise<Object> {
      await this.appointmentRepository.delete({napNo:id});
      await this.appointmentDiseaseRepository.delete({napNo:id});
      await this.morbiditiesRepository.delete({napNo:id});
      await this.drughtyRepository.delete({napNo:id});
      await this.patientRepository.delete({napNo:id});
      
      return {
        "statusCode": HttpStatus.OK,
        "message": " Succeed",
      };

    }


  async save(patient: Patient) {
    try {
      await this.patientRepository
        .createQueryBuilder()
        .insert()
        .into(TblPatient)
        .values([
          {
            napNo: patient.napNo,
            prefix: patient.prefix,
            firstName: patient.firstName,
            lastName: patient.lastName,
            nickname: patient.nickname,
            birthday: patient.birthday,
            age: patient.age,
            hn: patient.hn,
            idcard: patient.idcard,
            phoneNumber: patient.phoneNumber,
            weight: patient.weight,
            height: patient.height,
            job: patient.job,
            ucepId: patient.ucepId,
            name: patient.name,
            village:patient.village,
            place:patient.place,
            canton:patient.canton,
            province:patient.province,
            postalCode:patient.postalCode
          }
        ])
        .execute()
      return {
        "statusCode": HttpStatus.OK,
        "message": "Officer Register Succeed",
      }
    } catch (error) {
      return {
        "statusCode": HttpStatus.BAD_REQUEST,
        "message": "ชื่อผู้ใช้ซำ้กับในระบบกรุณาเปลียนชื่อผู้ใช้ !!!"
      }
    }

  }


  async patientExcel(): Promise<boolean>{

    const patients  = await this.patientRepository
    .createQueryBuilder("patient")
    .leftJoinAndSelect("patient.morbidities", "morbidities")
    .leftJoinAndSelect("patient.medicineHtr", "medicineHtr")
    .leftJoinAndSelect("patient.appointmentDisease", "appointmentDisease")
    .getMany()
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Sheet 1');
    var style1 = wb.createStyle({
      font: {
        name: 'Angsana New',
        bold: true,
        size: 20,
        vertAlign: 'center'
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center'
      },
      numberFormat: '#,##0.00; (#,##0.00); -',
    });

    var style2 = wb.createStyle({
      font: {
        name: 'Angsana New',
        size: 18,
        vertAlign: 'center'
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center'
      },
      border: {
        left: {
          style: "thin"
        },
        right: {
          style: "thin"
        },
        top: {
          style: "thin"
        },
        bottom: {
          style: "thin"
        }
      },
      numberFormat: '#,##0; (#,##0); -',
    });

    await ws.cell(1, 1, 1, 14, true)
    .string("ข้อมูลผู้ป้วยโรคเอดส์")
    .style(style1);

    ws.cell(2, 1)
    .string('รหัสผู้ป่วย')
    .style(style2);

    ws.cell(2, 2)
    .string('ชื่อผู้ป่วย')
    .style(style2);

    ws.cell(2, 3)
    .string('ชื่อเล่น')
    .style(style2);

    ws.cell(2, 4)
    .string('วันเกิด')
    .style(style2);

    ws.cell(2, 5)
    .string('อายุ')
    .style(style2);

    ws.cell(2, 6)
    .string('hn')
    .style(style2);

    ws.cell(2, 7)
    .string('รหัสบัตรประจำตัว')
    .style(style2);

    ws.cell(2, 8)
    .string('เบอร์โทร')
    .style(style2);

    ws.cell(2, 9)
    .string('ส่วนสูง')
    .style(style2);

    ws.cell(2, 10)
    .string('นำ้หนัก')
    .style(style2);
    
    ws.cell(2, 11)
    .string('อาชีพ')
    .style(style2);

    ws.cell(2, 12)
    .string('สิทธิ์')
    .style(style2);

    (await patients).forEach((values, item) => {
      ws.cell(item+3, 1)
      .string(values.napNo)
      .style(style2);

      ws.cell(item+3, 2)
      .string(values.prefix+' '+values.firstName+' '+values.lastName)
      .style(style2);

      ws.cell(item+3, 3)
      .string(values.nickname)
      .style(style2);

      ws.cell(item+3, 4)
      .string(values.birthday)
      .style(style2);

      ws.cell(item+3, 5)
      .number(values.age)
      .style(style2);

      ws.cell(item+3, 6)
      .string(values.hn)
      .style(style2);

      ws.cell(item+3, 7)
      .string(values.idcard)
      .style(style2);

      ws.cell(item+3, 8)
      .string(values.phoneNumber)
      .style(style2);

      ws.cell(item+3, 9)
      .string(values.height)
      .style(style2);

      ws.cell(item+3, 10)
      .string(values.weight)
      .style(style2);

      ws.cell(item+3, 11)
      .string(values.job)
      .style(style2);

      ws.cell(item+3, 12)
      .string(values.name)
      .style(style2);
      
      values.appointmentDisease.forEach((valuesD, itemD) => {
        ws.cell(2, 13+itemD)
        .string(valuesD.type)
        .style(style2);

        ws.cell(item+3, 13+itemD)
        .number(valuesD.checkType)
        .style(style2);
      })

      values.medicineHtr.forEach(async (valuesM, itemM) => {
        const user:any = await this.drughtyRepository
        .createQueryBuilder("drughty")
        .leftJoinAndSelect("drughty.dId", "dId")
        .where('drughty.mhId = :id',{
          id: valuesM.mhId
        })
        .getOne()
        
        console.log(user)
        console.log(user.dId)
        console.log(`${user.dId.name}`)

        ws.cell(2, 14+itemM)
        .string("เเพ้ยา")
        .style(style2);

        ws.cell(item+3, 14+itemM)
        .string(`${user.dId.name}`)
        .style(style2);
        
      })

      values.morbidities.forEach((valuesD, itemD) => {
        
      })

    });
    await wb.write('public/excel/Excel.xlsx');
    return true;
  }
}
