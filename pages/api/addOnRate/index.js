import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const data = await prisma.addOnRate.findMany({
          include: { products: true },
          where: {
            id: req.query.id,
          },
        });

        res.status(200).json(data);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log(req.body);
        await prisma.qtyRate.create({
          data: {
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
