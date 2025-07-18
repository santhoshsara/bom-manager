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
import { CreateSupplierDto, UpdateSupplierDto } from "./supplier.dto";
import { SupplierService } from "./supplier.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller("supplier")
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin")
  @Post()
  create(@Body() body: CreateSupplierDto) {
    return this.supplierService.create(body);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.supplierService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin")
  @Put(":id")
  update(@Param("id") id: string, @Body() body: UpdateSupplierDto) {
    return this.supplierService.update(id, body);
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.supplierService.remove(id);
  }
}
