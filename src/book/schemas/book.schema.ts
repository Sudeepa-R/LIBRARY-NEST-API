import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";

export enum Category{
    ADVENTURE='Adventure',
    CLASSICS='Classics',
    CRIME='Crime',
    FANTASY='Fantasy',
}

@Schema({
    timestamps:true
})

export class Book{

    @Prop()
    title:string;

    @Prop()
    description:string;

    @Prop()
    author:string;

    @Prop()
    price:number;

    @Prop()
    category:Category

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:"user"})
    user:User
    
    
    @Prop()
    imgCollection: string;
}

    

export const BookSchema=SchemaFactory.createForClass(Book)