import { IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength } from 'class-validator';

export class Patient {

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลรหัสผู้ป่วย' })
    @Matches(/^[0-9]+$/,{ message: 'กรุณากรอกข้อมูลรหัสผู้ป่วยเป็นตัวเลข' })
    napNo: string;

    @IsNotEmpty()
    @IsString()
    prefix: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลชื่อผู้ใช้' })
    @Matches(/^[\u0E00-\u0E7F]+$/,{ message: 'กรุณากรอกชื่อเป็นภาษาไทย' })
    firstName: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลนามสกุล' })
    @Matches(/^[\u0E00-\u0E7F]+$/,{ message: 'กรุณากรอกนามสกุลป็นภาษาไทย' })
    @IsString()
    lastName: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลชื่อเล่น' })
    @Matches(/^[\u0E00-\u0E7F]+$/,{ message: 'กรุณากรอกชื่อเล่นเป็นภาษาไทย' })
    @IsString()
    nickname: string;

    birthday: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลอายุ' })
    @Matches(/^[0-9]+$/,{ message: 'กรุณากรอกข้อมูลอายุตัวเลข' })
    age: string;

    
    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลHN' })
    @Matches(/^[a-zA-Z0-9-_]+$/,{ message: 'กรุณากรอกข้อมูลHNภาษาอังกฤษเเละตัวเลข' })
    hn: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลรหัสประชาชน' })
    @Matches(/^[0-9]+$/,{ message: 'กรุณากรอกข้อมูลรหัสประชาชน' })
    @MinLength(13,{ message: 'กรุณากรอกข้อมูลรหัสประชาชนให้ครบ 13 ตัว' })
    idcard:string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลเบอร์โทร' })
    @IsPhoneNumber("TH",{ message: 'กรุณากรอกข้อมูลเบอร์โทร' })
    phoneNumber: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลนำ้หนัก' })
    @Matches(/^[0-9]+$/,{ message: 'กรุณากรอกข้อมูลนำ้หนักเป็นตัวเลข' })
    weight: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลส่วนสูง' })
    @Matches(/^[0-9]+$/,{ message: 'กรุณากรอกข้อมูลส่วนสูงเป็นตัวเลข' })
    height: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลชื่อ' })
    @Matches(/^[\u0E00-\u0E7F]+$/,{ message: 'กรุณากรอกชื่อเป็นภาษาไทย' })
    @IsString()
    job: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลชื่อผู้ใช้' })
    @Matches(/^[a-zA-Z0-9-_]+$/,{ message: 'กรุณากรอกนามชื่อผู้ใช้ภาษาอังกฤษเเละตัวเลข' })
    ucepId: string;

    @IsNotEmpty({ message: 'กรุณากรอกข้อมูลชื่อ' })
    @Matches(/^[\u0E00-\u0E7F]+$/,{ message: 'กรุณากรอกชื่อเป็นภาษาไทย' })
    @IsString()
    name: string;
    
}