import { IsNotEmpty } from 'class-validator';
export class LogIn {
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    status: 'officer' | 'admin';
    
}