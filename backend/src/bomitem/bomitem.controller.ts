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
import { CreateBomItemDto, UpdateBomItemDto } from './bomitem.dto';
import { BomItemService } from './bomitem.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Designer')
@Controller('bom-item')
export class BomItemController {
  constructor(private readonly bomItemService: BomItemService) {}

  @Post()
  create(@Body() body: CreateBomItemDto) {
    return this.bomItemService.create(body);
  }

  @Get()
  findAll() {
    return this.bomItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bomItemService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateBomItemDto) {
    return this.bomItemService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bomItemService.remove(id);
  }
}
