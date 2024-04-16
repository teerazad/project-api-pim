import { IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength } from 'class-validator';

export class Drughty {

    id: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลยา' })
    @IsString()
    dId: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลผู้ป่วย' })
    @IsString()
    napNo: string;
    
}