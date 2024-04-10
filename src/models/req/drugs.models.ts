import { IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength } from 'class-validator';

export class Drugs {

    id: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลชื่อยา' })
    @IsString()
    name: string;
    
}