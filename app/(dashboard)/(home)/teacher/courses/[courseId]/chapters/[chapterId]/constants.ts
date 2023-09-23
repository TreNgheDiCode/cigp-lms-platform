import * as z from "zod";

export const formTitleSchema = z.object({
  title: z.string().min(1, {
    message: "Yêu cầu nhập tên bài giảng",
  }),
});
