import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Category } from "../schemas/book.schema"
import { User } from "src/auth/schemas/user.schema"


export class createBookDto{
    @IsNotEmpty()
    @IsString()
    readonly title:string

    @IsNotEmpty()
    @IsString()
    readonly description:string

    @IsNotEmpty()
    @IsString()
    readonly author:string

    @IsNotEmpty()
    @IsNumber()
    readonly price:number

    @IsNotEmpty()
    @IsEnum(Category,{message:'please enter the correct category'})
    readonly category:Category

    @IsEmpty({message:'You can not pass user id'})
    readonly user:User
    
    @IsOptional()
    imgCollection: string;

}