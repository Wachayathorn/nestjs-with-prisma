import { Injectable } from '@nestjs/common';
import { certificates } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  public async toJson(data) {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
      .replace(/"(-?\d+)n"/g, (_, a) => a);
  }

  public async get(): Promise<string> {
    try {
      const certificateList = await this.prisma.certificates.findMany();
      const result = await this.toJson(certificateList);
      return result;
    } catch (er) {
      throw er;
    }
  }
}
