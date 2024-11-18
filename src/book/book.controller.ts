import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { promises } from 'dns';
import { Book } from './schemas/book.schema';
import { createBookDto } from './dto/create-book.dto';
import { UpdateDto } from './dto/update-book.dto.';

@Controller('books')
export class BookController {
    constructor(private readonly booksServices:BookService){}

    @Get()
    async getAllBooks():Promise<Book[]>{
        return await this.booksServices.findAll();
    }

    @Post()
    async createBook(@Body()book:createBookDto):Promise<Book>{
        return await this.booksServices.creat(book)
    }

    @Get(':id')
    async getBookById(@Param('id')id:string):Promise<Book>{
        return await this.booksServices.findById(id);
    }

    @Put(':id')
    async updateBookById(@Param('id')id:string,@Body()book:UpdateDto):Promise<Book>{
        return await this.booksServices.updateById(id,book);
    }

    @Delete(':id')
    async deleteBookById(@Param('id')id:string):Promise<Book>{
        return await this.booksServices.deleteBookById(id);
    }
}
