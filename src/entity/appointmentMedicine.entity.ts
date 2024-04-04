import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { TblPatient } from './patient.entity';
import { TblDrug } from './drug.entity';

@Entity({name:"appointmentMedicine",comment:"วัดนัดรับยา"})
export class TblAppointmentMedicine {

  @PrimaryColumn({name:"aitm_id",type:"varchar"})
  aitmId: string;

  @Column({name:"aitm_Dt",type:"datetime"})
  aitmDt: string

  @Column({name:"number",type:"int"})
  number: string

  @ManyToOne(() => TblDrug, (drug) => drug.dId)
  @JoinColumn({name:"dId"}) 
  dId:  TblPatient

  @ManyToOne(() => TblPatient, (patient) => patient.napNo)
  @JoinColumn({name:"napNo"}) 
  napNo:  TblPatient

}