/*
  Warnings:

  - You are about to drop the column `alert_id` on the `drivers` table. All the data in the column will be lost.
  - You are about to drop the column `car_id` on the `drivers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_alert_id_fkey";

-- DropForeignKey
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_car_id_fkey";

-- AlterTable
ALTER TABLE "alerts" ADD COLUMN     "driver_id" UUID;

-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "driver_id" UUID;

-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "alert_id",
DROP COLUMN "car_id";

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
