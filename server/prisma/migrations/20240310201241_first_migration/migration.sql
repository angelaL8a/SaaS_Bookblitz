-- CreateEnum
CREATE TYPE "UserCompanyRole" AS ENUM ('Admin', 'Employee', 'Client');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('Idle', 'Started', 'Finished');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(150) NOT NULL,
    "lastName" VARCHAR(150) NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userImageUrl" TEXT DEFAULT 'https://res.cloudinary.com/dzqcwammp/image/upload/v1707877053/team65/mswj785kdjq5lwzlx2pn.png',
    "userImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInCompany" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "role" "UserCompanyRole" NOT NULL DEFAULT 'Admin',
    "telephone" TEXT,
    "birthDate" TIMESTAMP(3),
    "gender" TEXT,
    "position" TEXT,
    "startingDate" TIMESTAMP(3),
    "paymentPerHour" DOUBLE PRECISION,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "address" TEXT,
    "employeeColor" TEXT,

    CONSTRAINT "UserInCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" TEXT NOT NULL,
    "checkInTime" TIMESTAMP(3) NOT NULL,
    "checkOutTime" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "referencialImageUrl" TEXT,
    "referencialImageId" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "description" VARCHAR(450) NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL,
    "rating" INTEGER,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'Idle',
    "shiftId" TEXT NOT NULL,
    "clientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentOnAppointment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "CommentOnAppointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserInCompany_userId_companyId_key" ON "UserInCompany"("userId", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_url_key" ON "Company"("url");

-- AddForeignKey
ALTER TABLE "UserInCompany" ADD CONSTRAINT "UserInCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInCompany" ADD CONSTRAINT "UserInCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "UserInCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "UserInCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentOnAppointment" ADD CONSTRAINT "CommentOnAppointment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentOnAppointment" ADD CONSTRAINT "CommentOnAppointment_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "UserInCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;
