import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class ViewsController {
  @Get('login')
  @Render('index-login')
  getLogin(): object {
    return null;
  }

  @Get('admin/index')
  @Render('admin/index')
  getIndex(): object {
    return null;
  }

  @Get('admin/page-officer')
  @Render('admin/page-officer')
  getOfficer(): object {
    return null;
  }

  @Get('admin/page-officer-add')
  @Render('admin/page-officer-register')
  getRegisteOfficer(): object {
    return null;
  }

  @Get('admin/page-officer-edit')
  @Render('admin/page-officer-edit')
  getEditOfficer(): object {
    return null;
  }

  @Get('admin/page-admin')
  @Render('admin/page-admin')
  getAdmin(): object {
    return null;
  }

  @Get('admin/page-admin-add')
  @Render('admin/page-admin-register')
  getRegisteAdmin(): object {
    return null;
  }

  @Get('admin/page-admin-edit')
  @Render('admin/page-admin-edit')
  getEditAdmin(): object {
    return null;
  }

  @Get('admin/page-patient-form')
  @Render('admin/page-patient-form')
  getPatientForm(): object {
    return null;
  }

  @Get('admin/page-drugs-form')
  @Render('admin/page-drugs-form')
  getDrugs(): object {
    return null;
  }

  @Get('admin/page-drughty-form')
  @Render('admin/page-drughty-form')
  getDrughty(): object {
    return null;
  }
  
  @Get('admin/page-disease-form')
  @Render('admin/page-disease-form')
  getDisease(): object {
    return null;
  }

  @Get('admin/page-morbidities-form')
  @Render('admin/page-morbidities-form')
  getMorbidities(): object {
    return null;
  }

  @Get('admin/page-appointment-form')
  @Render('admin/page-appointment-form')
  getAppointment(): object {
    return null;
  }

}

