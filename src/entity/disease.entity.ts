import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { TblPatient } from './patient.entity';

@Entity({name:"disease",comment:"ตารางโรค"})
export class TblDrug {

  @PrimaryColumn({name:"dis_id",type:"varchar"})
  dId: string

  @Column({name:"name",type:"varchar"})
  name: string
}