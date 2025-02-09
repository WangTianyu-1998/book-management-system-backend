import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @Inject(DbService)
  private dbService: DbService;

  /**
   * 注册
   * @param registerUserDto
   */
  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();

    const findUser = users.find(
      (item) => item.username === registerUserDto.username,
    );

    if (findUser) {
      throw new BadRequestException('该用户已被注册');
    }
    const user = new User();
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;
    users.push(user);

    await this.dbService.write(users);
    return user;
  }

  /**
   * 登录接口
   * @param loginUserDto 用户输入的账号和密码数据
   * @returns
   */
  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();
    const findUser = users.find((u) => u.username === loginUserDto.username);
    if (!findUser) {
      throw new BadRequestException('用户不存在');
    }
    const isValidPassword = findUser?.password === loginUserDto?.password;
    if (!isValidPassword) {
      throw new BadRequestException('密码不正确');
    }
    return findUser;
  }
}
