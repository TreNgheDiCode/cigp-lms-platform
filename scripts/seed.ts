const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        {
          name: "Khoa học dữ liệu",
        },
        {
          name: "Hệ thống thông tin",
        },
        {
          name: "An ninh mạng",
        },
        {
          name: "Công nghệ phần mềm",
        },
      ],
    });

    console.log("success");
  } catch (error) {
    console.log("Error Seeding", error);
  } finally {
    await db.$disconnect();
  }
}

main();
