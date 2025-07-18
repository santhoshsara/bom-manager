import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SupplierService {
    constructor(private prisma: PrismaService) {}

  create(data: Prisma.SupplierCreateInput) {
    return this.prisma.supplier.create({ data });
  }

  findAll() {
    return this.prisma.supplier.findMany();
  }

  findOne(id: string) {
    return this.prisma.supplier.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.SupplierUpdateInput) {
    return this.prisma.supplier.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.supplier.delete({ where: { id } });
  }
}

