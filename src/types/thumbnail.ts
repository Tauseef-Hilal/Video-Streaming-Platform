export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type ThumbnailGroup = {
  low: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
};
