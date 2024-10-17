export interface User{
    name:string;
    email:string;
    password:string;
    mobile:number
}

export interface UserLogin{
    email:string;
    password:string
}

export interface Passwords {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}