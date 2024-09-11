import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarService {
    constructor (private prisma: PrismaService){
    }

    async addCar(dto:AddCarDto){
        const admin = await this.prisma.watcher.findFirst({
            where:{id:dto.watcherId}
        })

        if (admin.role === "WATCHER"){
            throw new ForbiddenException("You are not ADMIN")
        }
        
        const result = await this.prisma.car.create({
            data:{
                model:dto.model,
                year:dto.year,
                registrationCity:dto.registrationCity,
                driver:{connect:{id:dto.driverId}}
            }
        })

        return result
    }

    async updateCar(id,dto: UpdateCarDto){
        return this.prisma.car.update({
            where:{
                id:id
            },data:{
                model:dto.model,
                year:dto.year,
                registrationCity:dto.registationCity,
                driver:{connect:{id:dto.driverId}}
            }
        })
    }

    async getAllCars(){
        return this.prisma.car.findMany()
    }

    async getCarById(id){
        return this.prisma.car.findFirst({
            where:{
                id:id
            }
        })
    }

    async deleteCarById(id){
        await this.prisma.car.delete({
            where:{id:id}
        })
    }
}
