import * as z from "zod";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Yêu cầu nhập tên khóa học",
  }),
});
