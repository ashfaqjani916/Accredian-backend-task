-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "referrerEmail" TEXT NOT NULL,
    "friendEmail" TEXT NOT NULL,
    "referralCode" TEXT,
    "referralMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referrerEmail_key" ON "Referral"("referrerEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_friendEmail_key" ON "Referral"("friendEmail");
