import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name:"officers"})
export class TblOfficers {
  @PrimaryGeneratedColumn("uuid",{name:"id"})
  id: string;

  @Column({name:"first_name"})
  firstName: string;

  @Column({name:"last_name"})
  lastName: string;

  @Column({name:"username"})
  username: string;

  @Column({name:"paasword"})
  paasword: string;

  @Column({name:"job_position"})
  jobPosition: string

  @Column({name:"status"})
  status: string
}