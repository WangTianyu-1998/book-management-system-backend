import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';

/**
 * 1. 创建user模块,并在controller中写个register方法,目的是为了调用service中的register方法
 * 2. service中register方法作用是 将用户填写的数据存储或者提示用户已备被注册
 * 3. 方法虽然写好了,但是controller中的register需要对用户传递过来的参数进行校验
 * 4. 自定义RegisterUserDto方法, 设置接口的字段名以及校验规则
 * 5. 当用户调用接口时,逻辑通过userController后进入userService中,并调用register
 * 6. userService-register目的是需要将用户输入的数据进行存储或者提示报错
 * 7. 为了保证逻辑单一,需要创建 dbService 进行管理
 * 8. dbService作用是将数据读和写
 * 9. 注册DbModule时,因为存储的JSON需要区分,所以 DbModule需要设置动态模块,添加属性path
 * 10.
 */

@Module({
  // 设置动态模块,目的是crud的过程通过json来控制
  imports: [DbModule.register({ path: 'user.json' })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
