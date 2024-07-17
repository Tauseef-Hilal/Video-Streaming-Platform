import {
  Video,
  Channel,
  Category,
} from "@prisma/client";

import VideoSnippet from "./VideoSnippet";
import ChannelSnippet from "./ChannelSnippet";

export type {
  Video as VideoModel,
  Channel as ChannelModel,
  ChannelSnippet as ChannelSnippetModel,
  Category as CategoryModel,
  VideoSnippet as VideoSnippetModel,
};
