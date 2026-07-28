-- CreateTable
CREATE TABLE "room_types" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hotelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 2,
    "available" INTEGER NOT NULL DEFAULT 5,
    "amenities" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "room_types_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_hotel_bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingId" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "roomTypeId" TEXT,
    "checkIn" DATETIME NOT NULL,
    "checkOut" DATETIME NOT NULL,
    "rooms" INTEGER NOT NULL,
    "guests" INTEGER NOT NULL,
    CONSTRAINT "hotel_bookings_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "hotel_bookings_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "hotel_bookings_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "room_types" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_hotel_bookings" ("bookingId", "checkIn", "checkOut", "guests", "hotelId", "id", "rooms") SELECT "bookingId", "checkIn", "checkOut", "guests", "hotelId", "id", "rooms" FROM "hotel_bookings";
DROP TABLE "hotel_bookings";
ALTER TABLE "new_hotel_bookings" RENAME TO "hotel_bookings";
CREATE UNIQUE INDEX "hotel_bookings_bookingId_key" ON "hotel_bookings"("bookingId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
