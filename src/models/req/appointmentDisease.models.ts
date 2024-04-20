import { IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength } from 'class-validator';

export class Appointment {

    id: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลเวลานัดตรวจโรค' })
    @IsString()
    aitDt: string

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลผู้ป่วย' })
    @IsString()
    napNo: string;
    
}