import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverLoginDto } from 'src/api/auth/dto';
import { AuthGuard } from 'src/api/auth/auth.guard';
import { UpdateDriverDto } from './dto';
import { AddWatcherDto } from './dto/add-watcher.dto';

@UseGuards(AuthGuard)
@Controller('api/driver')
export class DriverController {
    constructor(private readonly driverService: DriverService){}

    @Post('add-watcher')
    async addWatcher(@Body() dto: AddWatcherDto){
        return this.driverService.addWatcher(dto)
    }

    @Post('delete-watcher')
    async delWatcher(@Body() id:string){
        return this.driverService.deleteWatcher(id)
    }

    @Get()
    async getAllDrivers(){
        return this.driverService.getDrivers()
    }
    
    @Get(':id')
    async getById(
        @Param('id') id: string,
        @Headers('Localization') loc:string
){
        return this.driverService.getById(id,loc)
    }

    @Patch(':id')
    async updateDriver(
        @Param('id') id :string,
        @Body() body:UpdateDriverDto){
            return this.driverService.updateDriver(id,body)
        }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return this.driverService.deleteDriver(id)
    }

}
