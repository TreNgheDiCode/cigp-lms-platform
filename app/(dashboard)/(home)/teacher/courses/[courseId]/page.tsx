import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  if (params.courseId.length !== 24) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
  });

  if (!course) {
    return redirect("/");
  }
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between"></div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">Tùy chỉnh khóa học</h1>
        <span className="text-sm text-slate-700">
          Điền thông tin các dòng {completionText}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Cập nhật thông tin khóa học của bạn</h2>
          </div>
          <TitleForm title={course.title} courseId={course.id} />
          <DescriptionForm
            description={course.description}
            courseId={course.id}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
