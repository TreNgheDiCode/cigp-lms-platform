"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  return (
    <Button size={"sm"} className="w-full md:w-auto">
      Mua khóa học ngay với {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
