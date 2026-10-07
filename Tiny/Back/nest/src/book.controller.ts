import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // GET http://localhost:3000/books
  @Get()
  async getBooks(): Promise<any> {
    return await this.bookService.getAllBooks();
  }

  // POST http://localhost:3000/books
  @Post()
  async createBook(@Body() body: Record<string, any>): Promise<string> {
    return await this.bookService.createBook(body);
  }

  // 미션 1: GET http://localhost:3000/books/category/1
  @Get('category/:categoryId')
  async getBooksByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<any> {
    return await this.bookService.getBooksByCategory(categoryId);
  }
}
