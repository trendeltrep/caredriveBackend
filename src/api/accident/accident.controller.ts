import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AccidentService } from './accident.service';
import { AddAccidentDto, UpdateAccidentDto } from './dto';

@Controller('api/accident')
export class AccidentController {

    constructor (private accidentService: AccidentService){}

    @Post('add')
    async addAccident(
        @Body() dto:AddAccidentDto
    ){
        return this.accidentService.addAccident(dto)
    }

    @Patch(":id")
    async updateAccident(
        @Param("id") id:string,
        @Body() body: UpdateAccidentDto
    ){
        return this.accidentService.updateAccident(id,body)
    }

    @Get()
    async getAccidents(){
        return this.accidentService.getAllAccidents()
    }

    @Get(":id")
    async getAccidentById(
        @Param('id') id:string
    ){
        return this.accidentService.getAccidentById(id)
    }

    @Delete(":id")
    async deleteAccidentById(
        @Param("id") id:string
    ){
        return this.accidentService.deleteAccidentById(id)
    }

}
