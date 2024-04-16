import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TblPatient } from './patient.entity';
import { TblDisease } from './disease.entity';

@Entity({name:"morbidities",comment:"ตารางโรคร่วม"})
export class TblMorbidities {

  @PrimaryColumn({name:"mor_id",type:"varchar"})
  morId: string

  @ManyToOne(() => TblPatient, (patient) => patient.napNo)
  @JoinColumn({name:"napNo"}) 
  napNo:string

  @ManyToOne(() => TblDisease, (disease) => disease.disId)
  @JoinColumn({name:"disId"}) 
  disId:string
}