import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import { TblMedicineHtr } from './medicineHistory.entity';
import { TblMorbidities } from './CoMorbidities.entity';
import { TblAppointmentDisease } from './appointmentDisease.entity';

@Entity({name:"patient",comment:"ตารางผู้ป่วย"})
export class TblPatient {

  @PrimaryColumn({name:"nap_no",type:"varchar"})
  napNo: string;

  @Column({name:"prefix_name",type:"varchar"})
  prefix: string

  @Column({name:"first_name",type:"varchar"})
  firstName: string;

  @Column({name:"last_name",type:"varchar"})
  lastName: string;

  @Column({name:"nickname",type:"varchar"})
  nickname: string;

  @Column({name:"birthday",type:"date"})
  birthday: string;

  @Column({name:"age",type:"integer"})
  age: string;

  @Column({name:"hn",type:"varchar"})
  hn: string;

  @Column({name:"id_card",type:"varchar"})
  phoneNumber: string;

  @Column({name:"phone_number",type:"varchar"})
  idcard: string;

  @Column({name:"weight",type:"varchar"})
  weight: string;

  @Column({name:"height",type:"varchar"})
  height: string;

  @Column({name:"job",type:"varchar"})
  job: string;

  @Column({name:"ucep_id",type:"varchar"})
  ucepId: string;

  @Column({name:"ucep_name",type:"varchar"})
  name: string;

  @Column({name:"village",type:"varchar"})
  village: string;

  @Column({name:"place",type:"varchar"})
  place: string;

  @Column({name:"canton",type:"varchar"})
  canton: string;

  @Column({name:"province",type:"varchar"})
  province: string;

  @Column({name:"postal_code",type:"varchar"})
  postalCode: string;

  @OneToMany(() => TblMedicineHtr, (medicineHtr) => medicineHtr.napNo)
  @JoinColumn({name:"medicineHtr"})
  medicineHtr: TblMedicineHtr[]

  @OneToMany(() => TblMorbidities, (morbidities) => morbidities.napNo)
  @JoinColumn({name:"morbidities"})
  morbidities: TblMorbidities[]

  @OneToMany(() => TblAppointmentDisease, (appointmentDisease) => appointmentDisease.napNo)
  @JoinColumn({name:"appointmentDisease"})
  appointmentDisease:TblAppointmentDisease[]

}