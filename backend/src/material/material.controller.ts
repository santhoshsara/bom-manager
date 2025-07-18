import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";

import { CreateMaterialDto, UpdateMaterialDto } from "./material.dto";
import { MaterialService } from "./material.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller("material")
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin")
  @Post()
  create(@Body() body: CreateMaterialDto) {
    return this.materialService.create(body);
  }

  @Get()
  findAll() {
    return this.materialService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.materialService.findOne(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin")
  @Put(":id")
  update(@Param("id") id: string, @Body() body: UpdateMaterialDto) {
    return this.materialService.update(id, body);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.materialService.remove(id);
  }
}
