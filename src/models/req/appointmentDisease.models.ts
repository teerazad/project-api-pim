import { IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength } from 'class-validator';

export class AppointmentDisease {

    id: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลเวลานัดตรวจโรค' })
    @IsString()
    aitDt: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูล' })
    @IsString()
    type: string;
  
    @IsNotEmpty({ message: 'กรุณากรอกข้อมูล' })
    @IsString()
    checkType: string;
  
    @IsNotEmpty({ message: 'กรุณากรอกข้อมูล' })
    @IsString()
    other: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลผู้ป่วย' })
    @IsString()
    napNo: string;
    
}