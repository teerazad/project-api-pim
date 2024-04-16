import { IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength } from 'class-validator';

export class Morbidities {

    id: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลโรค' })
    @IsString()
    disId: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลผู้ป่วย' })
    @IsString()
    napNo: string;
    
}