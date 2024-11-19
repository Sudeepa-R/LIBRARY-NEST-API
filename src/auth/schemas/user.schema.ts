import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../enums/rolws.enum";


@Schema({
    timestamps:true ,
})
export class User extends Document{
    @Prop()
    name:string

    @Prop({unique:true})
    email:string

    @Prop()
    password:string

    @Prop({
        type:[{type:String,enum:Role}],
        default:[Role.USer]
    })
    role:Role[]
}

export const UserSchema=SchemaFactory.createForClass(User);