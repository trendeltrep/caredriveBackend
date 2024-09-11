import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { DriverLoginDto } from 'src/api/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as EmailValidator from 'email-validator';
import { AddWatcherDto, UpdateDriverDto } from './dto';
import { WatcherIsTaken, cityTranslations } from 'src/constants/enum';


@Injectable()
export class DriverService {
    constructor(private prisma:PrismaService){}

    async getDriver(email:string):Promise<any>{
        return this.prisma.driver.findFirst({
            where: {
              email:email,
            },
          });
    }

    async getDrivers(): Promise<any>{
        return this.prisma.driver.findMany()
    }
    async translateCity(cityName: string, language: string) {
      if (language === 'uk') {
        return cityTranslations[cityName] || cityName;
      }
      return Object.keys(cityTranslations).find(key => cityTranslations[key] === cityName) || cityName;
    }
    async getById(id: string, language: string): Promise<any> {
      const driver = await this.prisma.driver.findUnique({
        where: { id },
      });
  
      if (driver) {
        driver.city = await this.translateCity(driver.city, language);
      }
  
      return driver;
    }
  
      async updateDriver(id:string,body:UpdateDriverDto){
        if (!EmailValidator.validate(body.email) ){
          throw new BadRequestException("Invalid email")
        }
        if (!/^\d{10}$/.test(body.phone)){
          throw new BadRequestException('Invalid phone number')
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password,salt)
        const result = await this.prisma.driver.update({
          where:{id:id},
          data: {
            email: body.email,
            driverSurname:body.driverSurname,
            city:body.city,
            phone: body.phone,
            password: hashedPassword,
            driverName:body.driverName
          }
        })
        return result
      }
  
      async deleteDriver(id:string){
        await this.prisma.driver.delete({where:{id}})
      }


    async addWatcher(dto:AddWatcherDto){
      const watcher = await this.prisma.watcher.findFirst({
        where:{id:dto.watcherId}
      })
      if (watcher.isTaken === WatcherIsTaken.TAKEN){
        throw new ForbiddenException("This watcher is Taken")
      }

      const updateWatcher = await this.prisma.watcher.update({
        where:{id:dto.watcherId},
        data:{isTaken:WatcherIsTaken.TAKEN}
      })

      const result = await this.prisma.driver.update({
        where:{
          id:dto.driverId
        },data:{
          watcher:{connect:{id:dto.watcherId}}
        }
      }) 
      return result
    }


    async deleteWatcher(dto){
      const watcher = (await this.prisma.driver.findFirst({where:{id:dto.driverId}})).watcherId
      const updateWatcher = await this.prisma.watcher.update({
        where:{id:watcher},
        data:{
          isTaken:WatcherIsTaken.FREE
      }})
      const result = await this.prisma.driver.update({
        where:{id:dto.driverId},data:{
          watcher:{disconnect:true}
        }
      })
      return result
    }
}
