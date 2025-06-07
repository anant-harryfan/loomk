"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { getWorkSpaces } from "@/app/action/workspace";
import { NotificationProps, WorkSpaceProps } from "@/types/index.type";
import { Select, SelectItem } from "@/components/ui/select";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  Separator,
} from "@radix-ui/react-select";
import Modal from "../modal";
import { Menu, PlusCircle } from "lucide-react";
import Search from "../search-user";
import { useQueryData } from "@/hooks/useQueryData";
import { MENU_ITEMS } from "@/constants";
import SideBarItem from "./sidebar-item";
import { getNotifications } from "@/app/action/user";
import WorkspacePlaceHolder from "./workspace-placeholder";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import InfoBar from "../info-bar";
import { useDispatch } from "react-redux";
import { WORKSPACES } from "@/redux/slices/workspaces";
import { ResizablePanel } from "@/components/ui/resizable";

type Props = {
  activeWorkspaceId: string;
};

// // Extract the actual payload type returned by getWorkSpaces()
// type GetWorkSpacesReturn = Awaited<ReturnType<typeof getWorkSpaces>>;

export default function Sidebar({ activeWorkspaceId }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch()
  const menuItems = MENU_ITEMS(activeWorkspaceId);
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);

  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getNotifications
  );
  //console.log(notifications);
  const { data: workspaces } = data as WorkSpaceProps;
  const { data: count } = notifications as NotificationProps;

  // //console.log(
  //   "🚀 ~ file: index.tsx:50 ~ Sidebar ~ data:",
  //   workspaces,
  //   notifications
  // );

  // 4. Handlers
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const currentWorkspace = workspaces?.workspace.find(
    (s) => s.id === activeWorkspaceId
  );
  if (isFetched && workspaces) {
    dispatch(WORKSPACES({workspaces: workspaces.workspace}))
  }
  // 5. Render loading / error states
  // if (isLoading) {
  //   return <div className="p-4 text-center">Loading workspaces…</div>;
  // }
  // if (error || !workspaces) {
  //   return (
  //     <div className="p-4 text-center text-gray-900">
  //       <pre>
  //         <code>
  //           {`

  //     const {data, isLoading, error} = useQuery({
  //         queryKey: ['user ‑ workspaces'],
  //       queryFn: getWorkSpaces,
  //       staleTime: 5 * 60_000, // optional: cache ko fresh 5 min me
  // })

  //       const payload = data as GetWorkSpacesReturn | undefined

  //       const workspaces = payload?.data?.workspace
  //       `}{" "}
  //           <br />
  //           ye tumhara code hai, to payload undefined ho gaya kisi reason se
  //         </code>
  //       </pre>
  //     </div>
  //   );
  // }

  // 6. Main JSX
  const SidebarSection= (
    <div className="bg-[#111111] flex-none relative p-4 h-full  flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoBjBICmGFEe59eu_fAaQCZtC66RpQQPJog&s"
          height={40}
          width={40}
          alt="logo"
        />
        <p className="text-2xl">Opal</p>
      </div>

      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select workspace" />
        </SelectTrigger>

        <SelectContent className="bg-[#111111] backdrop-blur-2xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspaces?.workspace.map((ws) => (
              <SelectItem key={ws.id} value={ws.id}>
                {ws.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {currentWorkspace?.type == "PUBLIC" && (
        <Modal
          trigger={
            <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/10 hover:bg-neutral-800/0 w-full rounded-sm p-[5px] gap-2">
              {" "}
              <PlusCircle
                size={15}
                className="text-neutral-800/90 fill-neutral-500"
              />{" "}
              <span className="text-neutral-400 font-semibold text-xs">
                {" "}
                SEND THE LINK{" "}
              </span>{" "}
            </span>
          }
          title="SEND LINK"
          description="send this link to anyone you want"
        >
          <Search workspaceid={activeWorkspaceId} />
        </Modal>
      )}
      <p className="w-full text-[#9d9d9d] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SideBarItem
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              key={item.title}
              notification={
                (item.title === "VackendTriggers" &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      {/* 
      <Separator /> */}
      <p className="w-full text-[#9d9d9d] font-bold mt-4">Workspaces</p>
      {
        workspaces.workspace.length == 1 && workspaces.members.length === 0 && <div className="w-full mt-[-10px]">
          <p className="text-[#666363] font-medium text-sm">mat dekh idhar</p>
        </div>
      }
      <nav className="w-full">
        
        <ul className="h-[450px] overflow-auto overflow-x-hidden fade-layer">
   
          {workspaces.workspace.length > 0 &&
            workspaces.workspace.map(
              (item) =>
                item.type !== "PERSONAL" && (
                  <SideBarItem
                    href={`/dashboard/${item.id} `}
                    selected={pathName == `/dashboard/${item.id}`}
                    title={item.name}
                    notification={0}
                    key={item.name}
                    icon={
                      <WorkspacePlaceHolder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceHolder>
                    }
                  />
                )
            )}
      
          {workspaces.members.length > 0 &&
            workspaces.members.map((item) => (
              <SideBarItem
                href={`/dashboard/${item.Workspace.id} `}
                selected={pathName == `/dashboard/${item.Workspace.id}`}
                title={item.Workspace.name}
                notification={0}
                key={item.Workspace.name}
                icon={
                  <WorkspacePlaceHolder>
                    {item.Workspace.name.charAt(0)}
                  </WorkspacePlaceHolder>
                }
              />
            ))}
         
        </ul>
      </nav>
      <Separator className="w-4/5 "/>
    </div>
  );

  return(
    <ResizablePanel>
    <div className="h-full">
     
      <div className="md:hidden fixed my-4">
    <Sheet>
      <SheetTrigger asChild className="ml-2">
        <Button variant={"ghost"} className="mt-[2px]">
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="p-0 w-fit h-full">
        {SidebarSection}
      </SheetContent>
    </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}

      </div>
      

    </div>
    </ResizablePanel>
  )
}
