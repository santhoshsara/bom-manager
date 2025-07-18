import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBomItemDto } from './bomitem.dto';

@Injectable()
export class BomItemService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBomItemDto) {
    return this.prisma.bOMItem.create({
      data: {
        quantity: dto.quantity,
        referenceCode: dto.referenceCode,
        bom: { connect: { id: dto.bomId } },
        material: { connect: { id: dto.materialId } },
        unit: { connect: { id: dto.unitId } },
        supplier: { connect: { id: dto.supplierId } },
      },
    });
  }

  findAll() {
    return this.prisma.bOMItem.findMany({
      include: {
        bom: { select: { id: true, name: true } },
        material: { select: { id: true, name: true } },
        unit: { select: { id: true, name: true } },
        supplier: { select: { id: true, name: true } },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.bOMItem.findUnique({
      where: { id },
      include: {
        bom: { select: { id: true, name: true } },
        material: { select: { id: true, name: true } },
        unit: { select: { id: true, name: true } },
        supplier: { select: { id: true, name: true } },
      },
    });
  }

  update(id: string, data: Prisma.BOMItemUpdateInput) {
    return this.prisma.bOMItem.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.bOMItem.delete({ where: { id } });
  }
}
