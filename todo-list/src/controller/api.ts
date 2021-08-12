import { Inject, Controller, Post, Get, Provide, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';
import * as DB from './fileDB';

@Provide()
@Controller('/api')
export class APIController {
  @Inject('ctx')
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/get_user')
  async getUser(@Query() uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  // POST /api/todo
  @Post('/todo')
  async addTodo() {
    const { text } = this.ctx.request.body;
    DB.add(text);

    // 跳转到直出的 HTML 页面
    this.ctx.redirect('/');
    return 'ok';
  }

  // GET /api/todo
  @Get('/todo')
  async getTodo() {
    return DB.list();
  }

  // GET /api/todo/delete
  @Get('/todo/delete')
  async deleteTodo() {
    // const text = this.ctx.query.text;
    const { text } = this.ctx.query;
    DB.del(text);
    // 跳转到直出的 HTML 页面
    this.ctx.redirect('/');
  }
}
