import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 使用 class-transformer class-validator 对参数进行自定义校验
   * @param RegisterUserDto 对body增加自定义校验的方法
   */
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    return this.userService.register(registerUserDto);
  }

  /**
   * 登录接口
   */
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    return this.userService.login(loginUserDto);
  }
}
