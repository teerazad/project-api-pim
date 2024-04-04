import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { TblMedicineHtr } from './medicineHistory.entity';
import { TblPatient } from './patient.entity';

@Entity({name:"appointment",comment:"ตารางนัดตรวจ"})
export class TblAppointment {

  @PrimaryColumn({name:"ait_id",type:"varchar"})
  aitId: string;

  @Column({name:"ait_Dt",type:"datetime"})
  aitDt: string

  @ManyToOne(() => TblPatient, (patient) => patient.napNo)
  @JoinColumn({name:"napNo"}) 
  napNo:  TblPatient

}