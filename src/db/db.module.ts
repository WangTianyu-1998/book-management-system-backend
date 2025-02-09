import { DynamicModule, Module } from '@nestjs/common';
import { DbService } from './db.service';
export interface DbModuleOptions {
  path: string;
}

@Module({
  // providers: [DbService],
})
export class DbModule {
  /**
   * 设置动态模块
   * 在 UserModule 里用的时候，path 是 users.json，在 BookModule 用的时候，path 是 books.json
   * 因为 path的不同 需要在导入的时候进行区分,所以需要设置动态模块
   * @param options
   * @returns
   */
  static register(options: DbModuleOptions): DynamicModule {
    return {
      module: DbModule,
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options,
        },
        DbService,
      ],
      exports: [DbService],
    };
  }
}
