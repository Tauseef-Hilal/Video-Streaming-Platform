import { SiGooglepodcasts, SiShortcut, SiYoutubeshorts } from "react-icons/si";
import { IoMdHelpCircle, IoMdHelpCircleOutline } from "react-icons/io";
import { AiFillFire, AiOutlineFire } from "react-icons/ai";
import { HiOutlineTrophy, HiTrophy } from "react-icons/hi2";
import { CgLivePhoto, CgMediaLive } from "react-icons/cg";
import { TbBrandGooglePodcasts } from "react-icons/tb";
import { BiSolidVideos } from "react-icons/bi";
import { IconType } from "react-icons";
import {
  MdFeedback,
  MdHome,
  MdLocalMovies,
  MdOutlineFeedback,
  MdOutlineFilterNone,
  MdOutlineHome,
  MdOutlineLocalMovies,
  MdOutlineSubscriptions,
  MdSubscriptions,
} from "react-icons/md";
import {
  RiHistoryFill,
  RiShoppingBag2Fill,
  RiShoppingBag3Fill,
  RiShoppingBag3Line,
  RiShoppingBagLine,
} from "react-icons/ri";
import {
  IoFlag,
  IoFlagOutline,
  IoGameController,
  IoGameControllerOutline,
  IoMusicalNoteOutline,
  IoMusicalNoteSharp,
  IoSettings,
  IoSettingsOutline,
} from "react-icons/io5";
import {
  FaLightbulb,
  FaNewspaper,
  FaRegLightbulb,
  FaRegNewspaper,
} from "react-icons/fa6";

export type SidebarLink = {
  link: string;
  icon: IconType;
  activeIcon: IconType;
  text: string;
};

export const sidebarLinks: (SidebarLink[] | null)[] = [
  [
    {
      link: "/",
      icon: MdOutlineHome,
      activeIcon: MdHome,
      text: "Home",
    },
    {
      link: "/shorts",
      icon: SiShortcut,
      activeIcon: SiYoutubeshorts,
      text: "Shorts",
    },
    {
      link: "/subscriptions",
      icon: MdOutlineSubscriptions,
      activeIcon: MdSubscriptions,
      text: "Subscriptions",
    },
  ],
  [
    {
      link: "/you",
      icon: MdOutlineFilterNone,
      activeIcon: BiSolidVideos,
      text: "You",
    },
    {
      link: "/history",
      icon: RiHistoryFill,
      activeIcon: RiHistoryFill,
      text: "History",
    },
  ],
  null,
  [
    {
      link: "/trending",
      icon: AiOutlineFire,
      activeIcon: AiFillFire,
      text: "Trending",
    },
    {
      link: "/Shopping",
      icon: RiShoppingBagLine,
      activeIcon: RiShoppingBag2Fill,
      text: "Shopping",
    },
    {
      link: "/music",
      icon: IoMusicalNoteOutline,
      activeIcon: IoMusicalNoteSharp,
      text: "Music",
    },
    {
      link: "/movies",
      icon: MdOutlineLocalMovies,
      activeIcon: MdLocalMovies,
      text: "Movies",
    },
    {
      link: "/live",
      icon: CgLivePhoto,
      activeIcon: CgMediaLive,
      text: "Live",
    },
    {
      link: "/gaming",
      icon: IoGameControllerOutline,
      activeIcon: IoGameController,
      text: "Gaming",
    },
    {
      link: "/news",
      icon: FaRegNewspaper,
      activeIcon: FaNewspaper,
      text: "News",
    },
    {
      link: "/sports",
      icon: HiOutlineTrophy,
      activeIcon: HiTrophy,
      text: "Sports",
    },
    {
      link: "/learning",
      icon: FaRegLightbulb,
      activeIcon: FaLightbulb,
      text: "Learning",
    },
    {
      link: "/fashion",
      icon: RiShoppingBag3Line,
      activeIcon: RiShoppingBag3Fill,
      text: "Fashion & Beauty",
    },
    {
      link: "/podcasts",
      icon: TbBrandGooglePodcasts,
      activeIcon: SiGooglepodcasts,
      text: "Podcasts",
    },
  ],
  [
    {
      link: "/settings",
      icon: IoSettingsOutline,
      activeIcon: IoSettings,
      text: "Settings",
    },
    {
      link: "/report",
      icon: IoFlagOutline,
      activeIcon: IoFlag,
      text: "Report History",
    },
    {
      link: "/help",
      icon: IoMdHelpCircleOutline,
      activeIcon: IoMdHelpCircle,
      text: "Help",
    },
    {
      link: "/feedback",
      icon: MdOutlineFeedback,
      activeIcon: MdFeedback,
      text: "Send Feedback",
    },
  ],
];

export default sidebarLinks;
