import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddAccidentDto, UpdateAccidentDto } from './dto';

@Injectable()
export class AccidentService {

    constructor (private prisma: PrismaService){
    }

    async addAccident(dto: AddAccidentDto){
        const admin = await this.prisma.watcher.findFirst({
            where:{id:dto.watcherId}
        })

        if (admin.role === "WATCHER"){
            throw new ForbiddenException("You are not ADMIN")
        }

        const result = await this.prisma.accident.create({
            data: {
                reason:dto.reason,
                place:dto.place,
                description:dto.description
            }
        })

        return result 
    }

    async updateAccident(id,dto: UpdateAccidentDto){
        return this.prisma.accident.update({
            where:{
                id:id
            },data:{
                place:dto.place,
                description:dto.description,
                reason:dto.reason
            }
        })
    }

    async getAllAccidents(){
        return this.prisma.accident.findMany()
    }

    async getAccidentById(id){
        return this.prisma.accident.findFirst({
            where:{
                id:id
            }
        })
    }

    async deleteAccidentById(id){
        await this.prisma.accident.delete({
            where:{id:id}
        })
    }
}
