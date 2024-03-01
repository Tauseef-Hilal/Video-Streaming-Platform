-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('FusionFlix', 'YouTube');

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishedAt" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "viewCount" TEXT NOT NULL,
    "likeCount" TEXT NOT NULL,
    "commentCount" TEXT NOT NULL,
    "hasCaption" BOOLEAN NOT NULL,
    "platform" "Platform" NOT NULL,
    "tags" TEXT[],
    "categoryId" TEXT NOT NULL DEFAULT '0',
    "channelId" TEXT NOT NULL,
    "thumbnailGroupId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "viewCount" TEXT NOT NULL,
    "subscriberCount" TEXT NOT NULL,
    "videoCount" TEXT NOT NULL,
    "keywords" TEXT[],
    "platform" "Platform" NOT NULL,
    "thumbnailGroupId" TEXT NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThumbnailGroup" (
    "id" TEXT NOT NULL,
    "lowId" TEXT,
    "mediumId" TEXT,
    "highId" TEXT,

    CONSTRAINT "ThumbnailGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thumbnail" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,

    CONSTRAINT "Thumbnail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "assignable" BOOLEAN NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_thumbnailGroupId_key" ON "Video"("thumbnailGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_thumbnailGroupId_key" ON "Channel"("thumbnailGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "ThumbnailGroup_lowId_key" ON "ThumbnailGroup"("lowId");

-- CreateIndex
CREATE UNIQUE INDEX "ThumbnailGroup_mediumId_key" ON "ThumbnailGroup"("mediumId");

-- CreateIndex
CREATE UNIQUE INDEX "ThumbnailGroup_highId_key" ON "ThumbnailGroup"("highId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_thumbnailGroupId_fkey" FOREIGN KEY ("thumbnailGroupId") REFERENCES "ThumbnailGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_thumbnailGroupId_fkey" FOREIGN KEY ("thumbnailGroupId") REFERENCES "ThumbnailGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThumbnailGroup" ADD CONSTRAINT "ThumbnailGroup_lowId_fkey" FOREIGN KEY ("lowId") REFERENCES "Thumbnail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThumbnailGroup" ADD CONSTRAINT "ThumbnailGroup_mediumId_fkey" FOREIGN KEY ("mediumId") REFERENCES "Thumbnail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThumbnailGroup" ADD CONSTRAINT "ThumbnailGroup_highId_fkey" FOREIGN KEY ("highId") REFERENCES "Thumbnail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
