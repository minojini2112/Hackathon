-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "register_number" TEXT NOT NULL,
    "roll_no" TEXT NOT NULL,
    "staff_incharge" TEXT NOT NULL,
    "class_incharge" TEXT NOT NULL,
    "placement_head" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'null',

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "competition_name" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "certificates" TEXT NOT NULL,
    "report" TEXT NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");
