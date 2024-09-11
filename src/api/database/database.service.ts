import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import { WatcherRole } from 'src/constants/enum';

@Injectable()
export class DatabaseService {

    constructor(private prisma: PrismaService){}

    async exportToExcel(): Promise<ExcelJS.Buffer> {

        const workbook = new ExcelJS.Workbook();
        const driverWorksheet = workbook.addWorksheet('driver');
        driverWorksheet.columns = [
          { header: 'id', key: 'id', width: 10 },
          { header: 'driver_name', key: 'driverName', width: 30 },
          { header: 'driver_surname', key: 'driverSurname', width: 30 },
          { header: 'created_at', key: 'createdAt', width: 30 },
          { header: 'updated_at', key: 'updatedAt', width: 30 },
          { header: 'city', key: 'city', width: 30 },
          { header: 'phone', key: 'phone', width: 30 },
          { header: 'password', key: 'password', width: 30 },
          { header: 'average_monthly_heartbeat', key: 'average_monthly_heartbeat', width: 30 },
          { header: 'watcher_id', key: 'watcherId', width: 30 },
        ];
        const drivers = await this.prisma.driver.findMany();
        driverWorksheet.addRows(drivers);
        
        const alertWorksheet = workbook.addWorksheet('alert');
        alertWorksheet.columns=[
            { header: 'id', key: 'id', width: 10 },
            { header: 'createdAt', key: 'createdAt', width: 10 },
            { header: 'reason', key: 'reason', width: 10 },
            { header: 'accidentId', key: 'accidentId', width: 10 },
            { header: 'driverId', key: 'driverId', width: 10 },
        ]
        const alerts = await this.prisma.alert.findMany();
        alertWorksheet.addRows(alerts);

        // Write to buffer
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
      }

    async importFromExcel(file){
        const num = 1;
    }

}
