import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { TblMedicineHtr } from './medicineHistory.entity';

@Entity({name:"Drug",comment:"ตารางยา"})
export class TblDrug {

  @PrimaryColumn({name:"d_id",type:"varchar"})
  dId: string;

  @Column({name:"name",type:"varchar"})
  name: string

  @OneToMany(() => TblMedicineHtr, (medicineHtr) => medicineHtr.mhId)
  checkRights: TblMedicineHtr[]
}