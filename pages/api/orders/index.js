import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        let page = +req.query.page || 1;
        let pageSize = +req.query.pageSize || 10;
        let status = req.query.status;
        let orderCode = req.query.orderCode;
        let startDate = req.query.startDate || new Date("01/01/1970");
        let endDate = req.query.endDate || new Date();
        const data = await prisma.$transaction([
          prisma.orders.count({
            where: {
              AND: {
                status: { contains: status },
                orderCode:{contains:orderCode},
                createdAt: {
                  gte: new Date(startDate).toISOString(),
                },
              },
              createdAt: { lte: new Date(endDate).toISOString() },
            },
          }),
          prisma.orders.findMany({
            where: {
              AND: {
                status: { contains: status },
                orderCode:{contains:orderCode},
                createdAt: {
                  gte: new Date(startDate).toISOString(),
                },
              },
              createdAt: { lte: new Date(endDate).toISOString() },
            },
            include: {
              orderDetail: {
                include: {
                  products: true,
                },
              },
              user: true,
            },
            orderBy: {
              id: "desc",
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
          }),
        ]);
        const totalPage = Math.ceil(data[0] / pageSize);
        res.status(200).json({ data: data[1], page, pageSize, totalPage });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        await prisma.orders.create({
          data: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            tel: req.body.tel,
            image: req.body.image,
            email: req.body.email,
            address: req.body.address,
            subDistrict: req.body.subDistrict,
            district: req.body.district,
            postalCode: req.body.postalCode,
            province: req.body.province,
            status: req.body.status,
            total: parseInt(req.body.total),

            ordersDetail: {
              create: req.body.productIdList.map((product) => ({
                productId: product.productId,
                sumPrice: parseInt(product.sumPrice),
                sumQty: parseInt(product.sumQty),
              })),
            },
          },
        });
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
