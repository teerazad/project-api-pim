import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { TblMedicineHtr } from './medicineHistory.entity';
import { TblPatient } from './patient.entity';

@Entity({name:"appointmentDisease",comment:"ตารางตรวจโรค"})
export class TblAppointmentDisease {

  @PrimaryColumn({name:"atd_id",type:"varchar"})
  aitId: string;

  @Column({name:"atd_Dt",type:"datetime"})
  aitDt: string;

  @Column({name:"type",type:"varchar"})
  type: string;

  @Column({name:"checkType",type:"varchar"})
  checkType: string;

  @Column({name:"other",type:"text"})
  other: string;

  @ManyToOne(() => TblPatient, (patient) => patient.napNo)
  @JoinColumn({name:"napNo"})
  napNo: string;

}