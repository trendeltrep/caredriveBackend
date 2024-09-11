-- CreateEnum
CREATE TYPE "WatcherIsTaken" AS ENUM ('TAKEN', 'FREE');

-- AlterTable
ALTER TABLE "watchers" ADD COLUMN     "isTaken" "WatcherIsTaken" NOT NULL DEFAULT 'FREE';
