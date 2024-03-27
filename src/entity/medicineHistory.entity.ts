import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { TblPatient } from './patient.entity';

@Entity({name:"medicineHtr"})
export class TblDrug {

  @PrimaryColumn({name:"mh_id",type:"varchar"})
  ucepId: string;

  @ManyToOne(() => TblPatient, (patient) => patient.napNo)
  napNo:  TblPatient

  @ManyToOne(() => TblDrug, (drug) => drug.dId)
  dId:  TblDrug
}