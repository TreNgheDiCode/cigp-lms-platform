"use client";

import * as z from "zod";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formImageSchema } from "../constants";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FileUpload from "@/components/file-upload";

interface TitleFormProps {
  imageUrl: string | null;
  courseId: string;
}

const ImageForm = ({ imageUrl, courseId }: TitleFormProps) => {
  const router = useRouter();

  const [isEditting, setIsEditting] = useState(false);

  const toggleEdit = () => {
    setIsEditting((current) => !current);
  };

  const onSubmit = async (values: z.infer<typeof formImageSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Cập nhật thành công");
      toggleEdit();
    } catch (error) {
      toast.error("Cập nhật tên khóa học thất bại");
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Hình ảnh khóa học
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditting && <>Hủy</>}
          {!isEditting && !imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Thêm hình ảnh
            </>
          )}
          {!isEditting && imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </>
          )}
        </Button>
      </div>
      {!isEditting &&
        (!imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={imageUrl}
            />
          </div>
        ))}

      {isEditting && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Khuyến khích sử dụng hình ảnh có tỷ lệ kích thước là 16:9
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
