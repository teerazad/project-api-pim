import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TblPatient } from './patient.entity';
import { TblDrug } from './drug.entity';


@Entity({name:"medicineHtr",comment:"ตารางประวัติแพ้ยา"})
export class TblMedicineHtr {

  @PrimaryColumn({name:"mh_id",type:"varchar"})
  mhId: string;

  @ManyToOne(() => TblPatient, (patient) => patient.napNo)
  @JoinColumn({name:"napNo"}) 
  napNo:  TblPatient

  @ManyToOne(() => TblDrug, (drug) => drug.dId)
  @JoinColumn({name:"dId"}) 
  dId:  TblDrug
}