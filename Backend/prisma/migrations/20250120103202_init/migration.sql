-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "staff_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "fromDate" TEXT NOT NULL,
    "toDate" TEXT NOT NULL,
    "registrationLimit" TEXT NOT NULL,
    "registeredNumber" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studentpost" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,

    CONSTRAINT "Studentpost_pkey" PRIMARY KEY ("id")
);
