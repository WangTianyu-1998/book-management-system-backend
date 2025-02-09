import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: '书面不能为空' })
  name: string;

  @IsNotEmpty({ message: '作者名不能为空' })
  author: string;

  @IsNotEmpty({ message: '描述不能为空' })
  desc: string;

  @IsNotEmpty({ message: '封面不能为空' })
  cover: string;
}
