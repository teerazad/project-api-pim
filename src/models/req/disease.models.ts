import { IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength } from 'class-validator';

export class Disease {

    id: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลชื่อโรค' })
    @IsString()
    name: string;
    
}