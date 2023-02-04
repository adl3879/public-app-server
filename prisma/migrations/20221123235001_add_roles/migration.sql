-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'OWNER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roles" "Role"[];
