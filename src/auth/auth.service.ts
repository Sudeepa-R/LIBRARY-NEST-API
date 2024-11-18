import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>,
        private jwtSrvice:JwtService
    ){}

    async signUp(signUpDto){
        const {name,email,password}=signUpDto
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await this.userModel.create({
            name,email,password:hashedPassword
        })
        
    }
}
