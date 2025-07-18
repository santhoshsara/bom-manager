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
import { BomService } from './bom.service';
import { CreateBomDto, UpdateBomDto } from './bom.dto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Designer')
@Controller('bom')
export class BomController {
  constructor(private readonly bomService: BomService) {}

  @Post()
  create(@Body() body: CreateBomDto) {
    return this.bomService.create(body);
  }

  @Get()
  findAll() {
    return this.bomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bomService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateBomDto) {
    return this.bomService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bomService.remove(id);
  }
}
