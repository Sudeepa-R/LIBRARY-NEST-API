import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "../schemas/book.schema"


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

}