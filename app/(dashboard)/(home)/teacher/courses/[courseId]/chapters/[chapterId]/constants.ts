import * as z from "zod";

export const formTitleSchema = z.object({
  title: z.string().min(1, {
    message: "Yêu cầu nhập tên bài giảng",
  }),
});

export const formDescriptionSchema = z.object({
  description: z.string().min(1, {
    message: "Yêu cầu nhập mô tả bài giảng",
  }),
});

export const formAccessSchema = z.object({
  isFree: z.boolean().default(false),
});

export const formVideoSchema = z.object({
  videoUrl: z.string().min(1),
});
