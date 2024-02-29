import {
  Video,
  Channel,
  Thumbnail,
  ThumbnailGroup,
  Category,
} from "@prisma/client";

import VideoSnippet from "./VideoSnippet";
import ChannelSnippet from "./ChannelSnippet";

export type {
  Video as VideoModel,
  Channel as ChannelModel,
  ChannelSnippet as ChannelSnippetModel,
  ThumbnailGroup as ThumbnailGroupModel,
  Thumbnail as ThumbnailModel,
  Category as CategoryModel,
  VideoSnippet as VideoSnippetModel,
};
