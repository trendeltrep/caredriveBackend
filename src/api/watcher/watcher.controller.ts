import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WatcherService } from './watcher.service';
import { AuthGuard } from 'src/api/auth/auth.guard';
import { WatcherLoginpDto } from 'src/api/auth/dto';
import { UpdateWatcherDto } from './dto/update-watcher.dto';

@Controller('api/watcher')
export class WatcherController {
    constructor(private watcherService:WatcherService){}

    @Get()
    async getAllWaiter(){
        return this.watcherService.getWatchers()
    }

    @Get(':id')
    async getById(@Param('id') id: string){
        return this.watcherService.getById(id)
    }


    @Patch(':id')
    async updateWatcher(@Param('id') id :string,
    @Body() body:UpdateWatcherDto)
    {return this.watcherService.updateWatcher(id,body)}


    @Post()
    async updateWaiter(@Headers('Waiter-Id') id :string,
    @Body() body:WatcherLoginpDto)
    {return this.watcherService.updateWatcher(id,body)}

    @Delete(':id')
    async delete(@Param('id') id:string){
        return this.watcherService.deleteWatcher(id)
    }

    

}
