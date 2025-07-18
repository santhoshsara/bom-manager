import { Module } from '@nestjs/common';
import { BomItemService } from './bomitem.service';
import { BomItemController } from './bomitem.controller';

@Module({
  providers: [BomItemService],
  controllers: [BomItemController],
})
export class BomitemModule {}
