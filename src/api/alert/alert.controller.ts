import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AlertService } from '../alert/alert.service';
import { AddAlertDto, UpdateAlertDto } from '../alert/dto';

@Controller('api/alert')
export class AlertController {

    constructor (private alertService: AlertService){}

    @Post('add')
    async addAlert(
        @Body() dto:AddAlertDto
    ){
        return this.alertService.addAlert(dto)
    }

    @Patch(":id")
    async updateAlert(
        @Param("id") id:string,
        @Body() body: UpdateAlertDto
    ){
        return this.alertService.updateAlert(id,body)
    }

    @Get()
    async getAlerts(){
        return this.alertService.getAllAlerts()
    }

    @Get(":id")
    async getAlertById(
        @Param('id') id:string
    ){
        return this.alertService.getAlertById(id)
    }

    @Delete(":id")
    async deleteAlertById(
        @Param("id") id:string
    ){
        return this.alertService.deleteAlertById(id)
    }

}
