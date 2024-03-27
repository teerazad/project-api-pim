import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { TblPatient } from './patient.entity';

@Entity({name:"Drug"})
export class TblDrug {

  @PrimaryColumn({name:"d_id",type:"varchar"})
  dId: string;

  @Column({name:"name",type:"varchar"})
  name: string

  @ManyToOne(() => TblPatient, (patient) => patient.napNo)
  napNo:  TblPatient
}