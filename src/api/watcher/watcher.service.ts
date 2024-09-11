import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { WatcherLoginpDto } from 'src/api/auth/dto';
import * as EmailValidator from 'email-validator';


@Injectable()
export class WatcherService {
    constructor(private prisma:PrismaService){}

    async getWatcher(email:string):Promise<any>{
        return this.prisma.watcher.findFirst({
            where: {
              email:email,
            },
          });
    }

    async getWatchers(): Promise<any>{
        return this.prisma.watcher.findMany()
    }

    async getById(id){
      return this.prisma.watcher.findFirst({
        where:{id:id}
      })
    } 

    async updateWatcher(id:string,body){
      if (!EmailValidator.validate(body.email) ){
        throw new BadRequestException("Invalid email")
      }
      if (!/^\d{10}$/.test(body.phone)){
        throw new BadRequestException('Invalid phone number')
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password,salt)
      const result = await this.prisma.watcher.update({
        where:{id:id},
        data: {
          email: body.email,
          watcherSurname:body.watcherSurname,
          phone: body.phone,
          password: hashedPassword,
          watcherName:body.watcherName
        }
      })
      return result
    }

    async deleteWatcher(id:string){
      await this.prisma.watcher.delete({where:{id}})
    }
}
