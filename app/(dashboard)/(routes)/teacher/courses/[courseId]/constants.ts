import * as z from "zod";

export const formTitleSchema = z.object({
  title: z.string().min(1, {
    message: "Yêu cầu nhập tên khóa học",
  }),
});

export const formDescriptionSchema = z.object({
  description: z.string().min(1, {
    message: "Yêu cầu nhập mô tả khóa học",
  }),
});

export const formImageSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Yêu cầu chọn một hình ảnh",
  }),
});

export const formCategorySchema = z.object({
  categoryId: z.string().min(1, {
    message: "Yêu cầu chọn tùy chọn",
  }),
});

export const formPriceSchema = z.object({
  price: z.coerce.number(),
});

export const formAttachmentSchema = z.object({
  url: z.string().min(1),
});

export const formChapterSchema = z.object({
  title: z.string().min(1),
});
