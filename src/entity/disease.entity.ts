import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { TblPatient } from './patient.entity';

@Entity({name:"disease",comment:"ตารางโรค"})
export class TblDisease {

  @PrimaryColumn({name:"dis_id",type:"varchar"})
  disId: string;

  @Column({name:"name",type:"varchar"})
  name: string;
}