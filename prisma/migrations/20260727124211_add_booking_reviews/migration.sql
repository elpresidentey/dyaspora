/*
  Warnings:

  - Added the required column `bookingId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "hotelId" TEXT,
    "flightId" TEXT,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "reviews_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "reviews_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "reviews_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flights" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_reviews" ("comment", "createdAt", "flightId", "hotelId", "id", "rating", "userId") SELECT "comment", "createdAt", "flightId", "hotelId", "id", "rating", "userId" FROM "reviews";
DROP TABLE "reviews";
ALTER TABLE "new_reviews" RENAME TO "reviews";
CREATE UNIQUE INDEX "reviews_userId_bookingId_key" ON "reviews"("userId", "bookingId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
