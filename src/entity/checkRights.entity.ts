import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TblPatient } from './patient.entity';

@Entity({name:"checkRights",comment:"ตารางตรวจสิทธิ์"})
export class TblCheckRights {

  @PrimaryColumn({name:"ucep_id",type:"varchar"})
  ucepId: string;

  @Column({name:"name",type:"varchar"})
  name: string

  @ManyToOne(() => TblPatient, (patient) => patient.napNo)
  @JoinColumn({name:"napNo"}) 
  napNo:  TblPatient
}