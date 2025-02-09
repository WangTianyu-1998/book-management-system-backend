import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './my-file-storage';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
      storage,
      limits: {
        fileSize: 1028 * 1024 * 3,
      },
      fileFilter(req, file, cb) {
        const extname = path.extname(file.originalname).toLowerCase();
        if (['.png', '.jpg', '.gif', '.jpeg'].includes(extname)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('只能上传图片'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path;
  }

  @Get('list')
  list(@Query('name') name: string) {
    return this.bookService.list(name);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookService.findById(+id);
  }

  @Post('create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Post('update')
  update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(+id);
  }
}
