import { IsNotEmpty, MinLength } from 'class-validator';

/**
 * 登录接口的校验规则
 */
export class LoginUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码不能少于6位' })
  password: string;
}
