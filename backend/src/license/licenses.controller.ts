import { Body, Controller, Post } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { LicensesService } from './licenses.service';

@Controller('')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post('/add-license')
  create(@Body() createLicenseDto: CreateLicenseDto): Promise<any> {
    return this.licensesService.create(createLicenseDto);
  }
}
