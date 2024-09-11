import { Body, Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { DatabaseService } from './database.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/database')
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService){}

    @Get('export')
    async exportToExcel(
      @Res() res: Response,
    ) {
      const buffer = await this.databaseService.exportToExcel();
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
      res.send(buffer);
    }

    @Post('import')
    @UseInterceptors(FileInterceptor('file'))
  async importFromExcel(@UploadedFile() file) {
    await this.databaseService.importFromExcel(file.buffer);
    return { message: 'Data import successful' };
  }
}
