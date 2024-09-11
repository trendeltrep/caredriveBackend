import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddAlertDto, UpdateAlertDto } from '../alert/dto';

@Injectable()
export class AlertService {

    constructor (private prisma: PrismaService){
    }

    async addAlert(dto: AddAlertDto){
        const admin = await this.prisma.watcher.findFirst({
            where:{id:dto.watcherId}
        })

        if (admin.role === "WATCHER"){
            throw new ForbiddenException("You are not ADMIN")
        }
        

        const result = await this.prisma.alert.create({
            data: {
                reason:dto.reason,
                accident:{connect:{id : dto.accidentId}},
                driver:{connect:{id:dto.driverId}}
            }
        })

        return result 
    }

    async updateAlert(id,dto: UpdateAlertDto){
        return this.prisma.alert.update({
            where:{
                id:id
            },data:{
                reason:dto.reason,
                accident:{connect:{id : dto.accidentId}}
            }
        })
    }

    async getAllAlerts(){
        return this.prisma.alert.findMany()
    }

    async getAlertById(id){
        return this.prisma.alert.findFirst({
            where:{
                id:id
            },include:{
                accident:{
                    select:{
                        id:true
                    }
                }
            }
        })
    }

    async deleteAlertById(id){
        await this.prisma.alert.delete({
            where:{id:id}
        })
    }

}
