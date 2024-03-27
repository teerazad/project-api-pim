import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { TblCheckRights } from './checkRights.entity';

@Entity({name:"patient"})
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

  @Column({name:"phone_number",type:"varchar"})
  phoneNumber: string;

  @Column({name:"right",type:"varchar"})
  right: string;

  @Column({name:"weight",type:"varchar"})
  weight: string;

  @Column({name:"height",type:"varchar"})
  height: string;

  @Column({name:"job",type:"varchar"})
  job: string;

  @OneToMany(() => TblCheckRights, (checkRights) => checkRights.napNo)
  photos: TblCheckRights[]
}