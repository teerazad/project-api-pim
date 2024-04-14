import { IsNotEmpty, IsString, IsStrongPassword, Matches, MinLength } from 'class-validator';

export class RegisterOfficer {
    id: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลคำนำหน้า' })
    @IsString()
    prefix: string

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลชื่อ' })
    @Matches(/^[\u0E00-\u0E7F]+$/,{ message: 'กรุณากรอกชื่อเป็นภาษาไทย' })
    @IsString()
    firstName: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลนามสกุล' })
    @Matches(/^[\u0E00-\u0E7F]+$/,{ message: 'กรุณากรอกนามสกุลป็นภาษาไทย' })
    @IsString()
    lastName: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลชื่อผู้ใช้' })
    @Matches(/^[a-zA-Z]+[0-9]+$/,{ message: 'กรุณากรอกนามชื่อผู้ใช้ภาษาอังกฤษเเละตัวเลข' })
    username: string;
    
    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลรหัสผ่าน' })
    @MinLength(12,{message:"กรุณากรอกมากว่า 12 ตัวอักษร"})
    @IsStrongPassword({},{message:"กรุณากรอกรหัส ตัวอักษร A-Z,a-z อักขระพิเศษ เเละ ตัวเลข 0-9"})
    password: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลตำเเหน่ง' })
    @Matches(/^[\u0E00-\u0E7F]+$/,{ message: 'กรุณากรอกตำเเหน่งเป็นภาษาไทย' })
    jobPosition: string

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูล' })
    @IsString()
    status: 'officer' | 'admin';
}