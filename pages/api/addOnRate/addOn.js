import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        await prisma.addOnRate.createMany({
          data: req.body.value.map((item) => ({
            length: parseFloat(item.distance),
            addOn: parseFloat(item.addOn),
            qtyRateId: item.qtyRateId,
          })),
        });
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        await prisma.qtyRate.create({
          data: {
            where: {
              id: req.query.qtyRateId,
            },
            qtyCheck: parseInt(req.body.qtyCheck),
            productId: req.body.productId,
            addOnRate: {
              create: req.body.addOnRate.map((rate) => ({
                length: parseFloat(rate.distance),
                addOn: parseFloat(rate.addOn),
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
