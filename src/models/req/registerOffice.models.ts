import { IsNotEmpty, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class RegisterOfficer {
    id: string;

    @IsNotEmpty({message:"กรุณากรอกข้อมูล"})
    @IsString()
    prefix: string

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูล' })
    @IsString()
    firstName: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูล' })
    @IsString()
    lastName: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูล' })
    username: string;
    
    @IsNotEmpty({ message: 'กรุณากรอกข้อมูล' })
    @IsStrongPassword()
    password: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูล' })
    @IsString()
    jobPosition: string

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูล' })
    @IsString()
    status: 'officer' | 'admin';
}