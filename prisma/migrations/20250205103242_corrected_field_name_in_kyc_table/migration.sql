/*
  Warnings:

  - You are about to drop the column `create_at` on the `kyc` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kyc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "id_type" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "id_photo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "kyc_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_kyc" ("address", "full_name", "id", "id_number", "id_photo", "id_type", "status", "updated_at", "user_id") SELECT "address", "full_name", "id", "id_number", "id_photo", "id_type", "status", "updated_at", "user_id" FROM "kyc";
DROP TABLE "kyc";
ALTER TABLE "new_kyc" RENAME TO "kyc";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
