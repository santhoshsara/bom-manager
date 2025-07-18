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
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import { ProductService } from "./product.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin")
  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin")
  @Put(":id")
  update(@Param("id") id: string, @Body() body: UpdateProductDto) {
    return this.productService.update(id, body);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("Admin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }
}
