import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { TblMedicineHtr } from './medicineHistory.entity';
import { TblPatient } from './patient.entity';
import { TblDrug } from './drug.entity';

@Entity({name:"appointmentMedicine",comment:"ตารางนัดตรวจ"})
export class TblAppointmentMedicine {

  @PrimaryColumn({name:"aitm_id",type:"varchar"})
  aitmId: string;

  @Column({name:"aitm_Dt",type:"datetime"})
  aitmDt: string

  @Column({name:"number",type:"int"})
  number: string

  @Column({name:"privilege",type:"varchar"})
  privilege: string

  @ManyToOne(() => TblDrug, (drug) => drug.dId)
  @JoinColumn({name:"dId"}) 
  dId:  TblPatient

  @ManyToOne(() => TblPatient, (patient) => patient.napNo)
  @JoinColumn({name:"napNo"}) 
  napNo:  TblPatient

}