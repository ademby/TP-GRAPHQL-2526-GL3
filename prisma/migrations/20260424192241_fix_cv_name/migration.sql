/*
  Warnings:

  - You are about to drop the `CV` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CVSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CV";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CVSkills";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Cv" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "job" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Cv_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CvSkills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CvSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "Cv" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CvSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CvSkills_AB_unique" ON "_CvSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_CvSkills_B_index" ON "_CvSkills"("B");
