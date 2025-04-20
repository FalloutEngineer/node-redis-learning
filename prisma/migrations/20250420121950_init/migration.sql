-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "legs" INTEGER NOT NULL,
    "sound" TEXT NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Toy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "Toy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Toy" ADD CONSTRAINT "Toy_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
