import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  var pad = (function (num) {
    return function () {
      var str = String(num++);
      while (str.length < 6) str = "0" + str;
      return "PD" + str;
    };
  })((await prisma.products.count()) + 1);

  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const data = await prisma.products.findMany({
          where: {
            AND: [
              {
                bestseller: {
                  gt: 0
                }
              },
              {
                bestseller: {
                  not: null
                }
              },
            ],
          },
          select: {
            id: true,
            name: true,
            bestseller: true,
          },
          orderBy: {
            bestseller: 'desc'
          }
        });
        res.status(200).json({ data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }

    case "POST":
      try {
        const productCode = pad();
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
