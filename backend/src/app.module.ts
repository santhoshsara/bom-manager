import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BomModule } from './bom/bom.module';
import { BomitemModule } from './bomitem/bomitem.module';
import { MaterialModule } from './material/material.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { UnitModule } from './unit/unit.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ProductModule,
    BomModule,
    BomitemModule,
    MaterialModule,
    UnitModule,
    SupplierModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // so you don't have to import it everywhere
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
