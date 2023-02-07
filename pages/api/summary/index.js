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
        const data = await prisma.$transaction([
          prisma.summary.count({
            where :{status:{contains:status}}
          }),
          prisma.summary.findMany({
            where :{status:{contains:status}},
            include: { 
              orderDetail:{
                include:{
                  products: true
                }
            },
              users:true
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
        console.log(error);
        // res.status(400).json({ success: false });
      }
      break;
    case "POST":
      console.log("req.body", req.body);
      try {
        await prisma.summary.create({
          data: {
            oderId: req.body.oderId,

            // summaryDetail: {
            //   create:
            //     req.body.productIdList.map((product) => ({
            //       productId: product.productId,
            //       sumPrice:parseInt(product.sumPrice),
            //       sumQty:parseInt(product.sumQty),
            //     })),
                
              
            // },
          },
        });
        res.status(201).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
