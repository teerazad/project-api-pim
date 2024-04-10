import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TblMedicineHtr } from './medicineHistory.entity';

@Entity({name:"Drug",comment:"ตารางยา"})
export class TblDrug {

  @PrimaryGeneratedColumn("uuid",{name:"id"})
  dId: string;

  @Column({name:"name",type:"varchar"})
  name: string

  @OneToMany(() => TblMedicineHtr, (medicineHtr) => medicineHtr.mhId)
  checkRights: TblMedicineHtr[]
}