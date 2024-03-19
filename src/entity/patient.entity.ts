import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Patient {

  @PrimaryColumn({name:"nap_no"})
  napNo: string;
  
}