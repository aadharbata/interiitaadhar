-- CreateTable
CREATE TABLE "Godown" (
    "id" SERIAL NOT NULL,
    "godown_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentGodownId" TEXT,

    CONSTRAINT "Godown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "item_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "parentGodownId" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "attributes" JSONB,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Godown_godown_id_key" ON "Godown"("godown_id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_item_id_key" ON "Item"("item_id");

-- AddForeignKey
ALTER TABLE "Godown" ADD CONSTRAINT "Godown_parentGodownId_fkey" FOREIGN KEY ("parentGodownId") REFERENCES "Godown"("godown_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_parentGodownId_fkey" FOREIGN KEY ("parentGodownId") REFERENCES "Godown"("godown_id") ON DELETE RESTRICT ON UPDATE CASCADE;
