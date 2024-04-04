import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name:"officers",comment:"ตารางเจ้าหน้าที่"})
export class TblOfficers {
  @PrimaryGeneratedColumn("uuid",{name:"id"})
  id: string;

  @Column({name:"prefix_name"})
  prefix: string

  @Column({name:"first_name"})
  firstName: string;

  @Column({name:"last_name"})
  lastName: string;

  @Column({name:"username",unique:true})
  username: string;

  @Column({name:"password"})
  password: string;

  @Column({name:"job_position"})
  jobPosition: string;

  @Column({name:"status"})
  status: string;
}