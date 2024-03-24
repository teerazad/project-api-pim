import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class ViewsController {
  @Get('login')
  @Render('index-login')
  getLogin(): object {
    return null;
  }

  @Get('add/officer')
  @Render('page-admin/page-officer')
  getRegisteOfficer(): object {
    return null;
  }
}

