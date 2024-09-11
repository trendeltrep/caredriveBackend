import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { AddCarDto, UpdateCarDto } from './dto';

@Controller('api/car')
export class CarController {

    constructor (private carService: CarService){}

    @Post('add')
    async addCar(
        @Body() dto:AddCarDto
    ){
        return this.carService.addCar(dto)
    }

    @Patch(":id")
    async updateCar(
        @Param("id") id:string,
        @Body() body: UpdateCarDto
    ){
        return this.carService.updateCar(id,body)
    }

    @Get()
    async getCars(){
        return this.carService.getAllCars()
    }

    @Get(":id")
    async getCarById(
        @Param('id') id:string
    ){
        return this.carService.getCarById(id)
    }

    @Delete(":id")
    async deleteCarById(
        @Param("id") id:string
    ){
        return this.carService.deleteCarById(id)
    }

}
