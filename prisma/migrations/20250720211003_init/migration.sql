-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datasets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "datasets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "records" (
    "id" SERIAL NOT NULL,
    "dataset_id" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "queries" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "dataset_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "queries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "queries_user_id_idx" ON "queries"("user_id");

-- CreateIndex
CREATE INDEX "queries_dataset_id_idx" ON "queries"("dataset_id");

-- AddForeignKey
ALTER TABLE "datasets" ADD CONSTRAINT "datasets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_dataset_id_fkey" FOREIGN KEY ("dataset_id") REFERENCES "datasets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queries" ADD CONSTRAINT "queries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queries" ADD CONSTRAINT "queries_dataset_id_fkey" FOREIGN KEY ("dataset_id") REFERENCES "datasets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
