"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formVideoSchema } from "../constants";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FileUpload from "@/components/file-upload";
import { Chapter, MuxData } from "@prisma/client";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const router = useRouter();

  const [isEditting, setIsEditting] = useState(false);

  const toggleEdit = () => {
    setIsEditting((current) => !current);
  };

  const onSubmit = async (values: z.infer<typeof formVideoSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Cập nhật thành công");
      toggleEdit();
    } catch (error) {
      toast.error("Cập nhật bài giảng thất bại");
    } finally {
      router.refresh();
      window.location.reload();
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video bài giảng
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditting && <>Hủy</>}
          {!isEditting && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Thêm video
            </>
          )}
          {!isEditting && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Chọn video
            </>
          )}
        </Button>
      </div>
      {!isEditting &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}

      {isEditting && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Đăng tải video bài giảng
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditting && (
        <div className="text-xs text-muted-foreground mt-2">
          Video có thể mất đến vài phút để xử lý. Tải lại trang nếu video không
          xuất hiện
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
