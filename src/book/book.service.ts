import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { UpdateDto } from './dto/update-book.dto.';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>

    ){}

    async findAll():Promise<Book[]>{
        const books=await this.bookModel.find()
        return books;
    }

    async creat(book:Book):Promise<Book>{
        return await this.bookModel.create(book);
    }

    async findById(id:string):Promise<Book>{
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
}
