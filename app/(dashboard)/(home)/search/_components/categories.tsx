"use client";

import { Category } from "@prisma/client";
import {
  FcComboChart,
  FcDataConfiguration,
  FcMultipleDevices,
  FcParallelTasks,
} from "react-icons/fc";
import { IconType } from "react-icons";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Công nghệ phần mềm": FcMultipleDevices,
  "An ninh mạng": FcParallelTasks,
  "Hệ thống thông tin": FcComboChart,
  "Khoa học dữ liệu": FcDataConfiguration,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
