import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto, UpdateUnitDto } from './unit.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin")
  @Post()
  create(@Body() body: CreateUnitDto) {
    return this.unitService.create(body);
  }

  @Get()
  findAll() {
    return this.unitService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin")
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUnitDto) {
    return this.unitService.update(id, body);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitService.remove(id);
  }
}
