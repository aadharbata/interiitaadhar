/*
  Warnings:

  - You are about to drop the column `flow` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Godown" ADD COLUMN     "flow" TEXT[];

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "flow";
