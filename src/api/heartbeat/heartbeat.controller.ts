import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { HeartbeatService } from '../heartbeat/heartbeat.service';
import { AddHeartbeatDto, UpdateHeartbeatDto } from '../heartbeat/dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/heartbeat')
export class HeartbeatController {

    constructor (private heartbeatService: HeartbeatService){}

    @Post('add')
    async addHeartbeat(
        @Body() dto:AddHeartbeatDto
    ){
        return this.heartbeatService.addHeartbeat(dto)
    }

    @Patch(":id")
    async updateHeartbeat(
        @Param("id") id:string,
        @Body() body: UpdateHeartbeatDto
    ){
        return this.heartbeatService.updateHeartbeat(id,body)
    }

    @Get()
    async getHeartbeats(){
        return this.heartbeatService.getAllHeartbeats()
    }

    @Get(":id")
    async getHeartbeatById(
        @Param('id') id:string
    ){
        return this.heartbeatService.getHeartbeatById(id)
    }

    @Delete(":id")
    async deleteHeartbeatById(
        @Param("id") id:string
    ){
        return this.heartbeatService.deleteHeartbeatById(id)
    }

}
