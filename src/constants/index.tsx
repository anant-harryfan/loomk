import { Borepanti } from "@/components/icons/borepanti";
import { Home } from "@/components/icons/home";
import { Tv } from "@/components/icons/tv";
import { VackendTriggers } from "@/components/icons/vackendTriggers";
import { VideoEditor } from "@/components/icons/videoEditor";

export const MENU_ITEMS = (
  workspaceId: string
): { title: string; href: string; icon: React.ReactNode }[] => [
  { title: "Home", href: `/dashboard/${workspaceId}/home?`, icon: <Home /> },
  {
    title: "Tv",
    href: `/dashboard/${workspaceId}`,
    icon: <Tv />,
  },
  {
    title: "VackendTriggers",
    href: `/dashboard/${workspaceId}/vackendtriggers`,
    icon: <VackendTriggers />,
  },
  {
    title: "Settings",
    href: `/dashboard/${workspaceId}/settings?`,
    icon: <Borepanti />,
  },
  {
    title: "VideoEditor",
    href: `/dashboard/${workspaceId}/videoeditor?`,
    icon: <VideoEditor />,
  },
]; // capital I dhyan rakhna
