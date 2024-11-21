import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { UpdateDto } from './dto/update-book.dto.';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';
@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>

    ){}

    async findAll(query:Query):Promise<Book[]>{
        const resPerPage=2
        const currentPage=Number(query.page) || 1
        const skip=resPerPage*(currentPage-1)
        const keyword=query.keyword?{
            title:{
                $regex:query.keyword,
                $options:'i'
            }
        }:{}
        const books=await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip)
        return books;
    }

    async creat(book:Book,user:User):Promise<Book>{
        const data=Object.assign(book,{user: user._id})
        return await this.bookModel.create(data);
    }

    async findById(id:string):Promise<Book>{
        const isValidId=mongoose.isValidObjectId(id)
        if (!isValidId){
            throw new BadRequestException("Enter the correct id!");
        }
        const res= await this.bookModel.findById(id);
        if (!res){
            throw new NotFoundException("Book Not Found!!");
        }
        return res;
    }

    async updateById(id:string,book:UpdateDto):Promise<Book>{
        return await this.bookModel.findByIdAndUpdate(id,book,{
            new:true,
            runValidators:true,
        });
    }

    async deleteBookById(id:string):Promise<Book>{
        return await this.bookModel.findByIdAndDelete(id);
    }

    async uploadImagesById(id:string,files:Array<Express.Multer.File>):Promise<Book>{
        let imageData=[];
        files.forEach(file=>{
           const newImg={
                imgname:file.originalname,
                imgdata:file.buffer,
                contentType:file.mimetype,
           }
            imageData.push(newImg)
        })
        const imgCollection=JSON.stringify(imageData);
        return await this.bookModel.findByIdAndUpdate(id,{imgCollection:imgCollection})
    }
}
