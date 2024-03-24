import { IsNotEmpty, IsStrongPassword, Matches, MinLength } from 'class-validator';
export class LogIn {
    
    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลชื่อผู้ใช้' })
    @Matches(/^[a-zA-Z]+[0-9]+$/,{ message: 'กรุณากรอกชื่อผู้ใช้เป็นภาษาอังกฤษเเละตัวเลข' })
    username: string;
    
    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลรหัสผ่าน' })
    @MinLength(12,{message:"กรุณากรอกมากว่า 12 ตัวอักษร"})
    @IsStrongPassword({},{message:"กรุณากรอกรหัส ตัวอักษร A-Z,a-z อักขระพิเศษ เเละ ตัวเลข 0-9"})
    password: string;   
}