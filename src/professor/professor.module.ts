import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [ProfessorController],
  providers: [ProfessorService, PrismaService, JwtService],
  exports: [ProfessorService],
})
export class ProfessorModule {}
