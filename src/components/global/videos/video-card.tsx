import React from "react";
import Loader from "../loader";
import CardMenu from "./video-card-menu";
import ChangeVideoLocation from "../change-videolocation/ChangeVideoLocation";
import CopyLink from "./video-copy-link";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, User } from "lucide-react";


type Props = {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string | null;
  source: string;
  processing: boolean;
  workspaceId: string;

};

const VideoCard = (props: Props) => {

  return (

    <Loader
      className="bg-[#171717] flex justify-center items-center border-[1px] border-[#252525] rounded-xl"
      state={props.processing}
      >
      <div className=" dragu group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-sm">
        <div className=" absolute top-3 right-3 z-500 gap-x-0.01 hidden group-hover:flex">
       
          <CopyLink
                      className="p-0 h-5  cursor-pointer"
            videoId={props.id}
            variant={'ghost'}
          />
  <div id="draggH" draggable={true}>
                  <CardMenu
                      currentFolder={props.Folder?.id}
                      currentFolderName={props.Folder?.name}
                      currentWorkspace={props.workspaceId}
                      videoId={props.id}
                  />
          </div> 
        </div>
              <Link
                  href={`/dashboard/${props.workspaceId}/video/${props.id}`}
                  className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full "
              >
                  <video
                      controls={false}
                      preload="metadata"
                      className="w-full aspect-video opacity-50 z-20"
                  >
                      <source
                          src={`${process.env.NEXT_PUBLIC_HOST_URL}/${props.source}#t=1`} />
                  </video>
                  <div className="px-[4px] py-3 flex flex-col gap-y-2 z-20 items-center">
                    <h2 className="text-sm  font-semibold text-[#ffffff]">
                        {props.title}
                    </h2>
                      <div className="flex gap-y-4 gap-x-2  mt-3 ">
                          {/* {} */}
                          <Avatar className=" w-5 h-5" >
                              <AvatarImage src={props.User?.image as string}/>
                                <AvatarFallback>
                                    <User/>
                                </AvatarFallback>
                        </Avatar>
                          <div>
                              <p className="capitalize text-[#9d9d9d] text-xs ">{props.User?.firstname}{props.User?.lastname}</p>
                              <p className="capitalize text-[#9d9d9d] text-[7px]">23</p>
                          </div>
                    <Share2
                    fill="#9d9d9d"
                    className="text-[#9d9d9] ml-12"
                    size={12}
                    />
                    </div>
                  </div>
              </Link>
              </div>
              
              </Loader>

            );
          };

export default VideoCard;
