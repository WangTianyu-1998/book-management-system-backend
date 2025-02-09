import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  @Inject(DbService)
  private dbService: DbService;

  async list(name?: string) {
    const books: Book[] = await this.dbService.read();
    return name
      ? books.filter((book) => {
          return book.name.includes(name);
        })
      : books;
  }

  async findById(id: number) {
    const books: Book[] = await this.dbService.read();
    const bookItem = books.find((b) => b.id === id);
    if (!bookItem) {
      throw new BadRequestException(`id为${id} 的书名不存在`);
    }
    return bookItem;
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();
    let book = new Book();
    // book.id = randomNum()
    // book.author = createBookDto.author
    book = {
      ...createBookDto,
      id: randomNum(),
    };
    books.push(book);
    await this.dbService.write(books);
    return book;
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const bookItem = books.find((b) => b.id === updateBookDto.id);
    if (!bookItem) {
      throw new BadRequestException(`id为${updateBookDto.id} 的书名不存在`);
    }

    bookItem.author = updateBookDto.author;
    bookItem.cover = updateBookDto.cover;
    bookItem.desc = updateBookDto.desc;
    bookItem.name = updateBookDto.name;

    await this.dbService.write(books);
    return bookItem;
  }

  async delete(id: number) {
    const books: Book[] = await this.dbService.read();
    const isFind = books.find((b) => b.id === id);
    if (!isFind) {
      throw new BadRequestException(`id为${id} 的书名不存在`);
    }
    const updateBooks = books.filter((b) => b.id !== id);
    await this.dbService.write(updateBooks);
    return 'ok';
  }
}
