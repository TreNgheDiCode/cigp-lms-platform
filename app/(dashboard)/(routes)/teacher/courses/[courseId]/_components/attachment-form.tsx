"use client";

import * as z from "zod";
import axios from "axios";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formAttachmentSchema } from "../constants";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FileUpload from "@/components/file-upload";
import { Attachment, Course } from "@prisma/client";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const router = useRouter();

  const [isEditting, setIsEditting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => {
    setIsEditting((current) => !current);
  };

  const onSubmit = async (values: z.infer<typeof formAttachmentSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Cập nhật thành công");
      toggleEdit();
    } catch (error) {
      toast.error("Cập nhật khóa học thất bại");
    } finally {
      router.refresh();
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Xóa tài liệu thành công");
      router.refresh();
    } catch (error) {
      toast.error("Xóa tài liệu thất bại");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Tài liệu khóa học
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditting && <>Hủy</>}
          {!isEditting && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Chọn tập tin
            </>
          )}
        </Button>
      </div>
      {!isEditting && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              Không có tài liệu được đính kèm
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-sm line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditting && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Thêm bất kỳ tài liệu nào vào cho khóa học của bạn
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
