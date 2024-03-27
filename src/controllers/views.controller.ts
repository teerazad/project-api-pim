import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class ViewsController {
  @Get('login')
  @Render('index-login')
  getLogin(): object {
    return null;
  }

  @Get('admin/index')
  @Render('page-admin/index')
  getIndex(): object {
    return null;
  }

  @Get('admin/page-officer')
  @Render('page-admin/page-officer')
  getOfficer(): object {
    return null;
  }

  @Get('admin/page-officer-add')
  @Render('page-admin/page-officer-register')
  getRegisteOfficer(): object {
    return null;
  }
}

