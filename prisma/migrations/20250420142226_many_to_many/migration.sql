/*
  Warnings:

  - You are about to drop the column `animalId` on the `Toy` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Toy" DROP CONSTRAINT "Toy_animalId_fkey";

-- AlterTable
ALTER TABLE "Toy" DROP COLUMN "animalId";

-- CreateTable
CREATE TABLE "_AnimalToToy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AnimalToToy_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AnimalToToy_B_index" ON "_AnimalToToy"("B");

-- AddForeignKey
ALTER TABLE "_AnimalToToy" ADD CONSTRAINT "_AnimalToToy_A_fkey" FOREIGN KEY ("A") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToToy" ADD CONSTRAINT "_AnimalToToy_B_fkey" FOREIGN KEY ("B") REFERENCES "Toy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
