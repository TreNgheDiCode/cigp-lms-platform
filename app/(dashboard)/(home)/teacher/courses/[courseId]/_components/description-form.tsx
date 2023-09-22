"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { formDescriptionSchema } from "../constants";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface TitleFormProps {
  description?: string;
  courseId: string;
}

const DescriptionForm = ({ description, courseId }: TitleFormProps) => {
  const router = useRouter();

  const [isEditting, setIsEditting] = useState(false);

  const toggleEdit = () => {
    setIsEditting((current) => !current);
  };

  const form = useForm<z.infer<typeof formDescriptionSchema>>({
    resolver: zodResolver(formDescriptionSchema),
    defaultValues: {
      description: description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formDescriptionSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Cập nhật thành công");
      toggleEdit();
    } catch (error) {
      toast.error("Cập nhật tên khóa học thất bại");
    } finally {
      router.refresh();
      form.reset();
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Mô tả khóa học
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditting ? (
            <>Hủy</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </>
          )}
        </Button>
      </div>
      {!isEditting ? (
        <p
          className={cn(
            "text-sm mt-2",
            !description && "text-slate-500 italic"
          )}
        >
          {description || "Không có mô tả"}
        </p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Vd: Sử dụng các kiến thức cơ bản nhất trong việc lập trình để trau dồi và tăng cao kiến thức về mobile..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={isSubmitting || !isValid} type="submit">
                Lưu thay đổi
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DescriptionForm;
