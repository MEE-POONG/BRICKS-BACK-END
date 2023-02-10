import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
   var pad = (function (num) {
        return function () {
          var str = String(num++);
          while (str.length < 6) str = "0" + str;
          return "PD" + str;
        };
      })(await prisma.products.count()+1);

  const { method } = req;
  switch (method) {

    case "GET":
      try {
        let page = +req.query.page || 1;
        let pageSize = +req.query.pageSize || 10;
        let name = req.query.name ;
        let subTypeId = req.query.subTypeId ;
        const data = await prisma.$transaction([
          prisma.products.count(
            {where:{name:{contains:name},subTypeId:subTypeId}}
          ),
          prisma.products.findMany({
            where:{name:{contains:name},subTypeId:subTypeId},
            include: { subType: { include: { type: true } } },
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
        const productCode = pad()
        await prisma.products.create({
          data: {
            productCode: productCode,
            image: req.body.image,
            name: req.body.name,
            detail: req.body.detail,
            subTypeId: req.body.subTypeId,
            price: parseInt(req.body.price),
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
