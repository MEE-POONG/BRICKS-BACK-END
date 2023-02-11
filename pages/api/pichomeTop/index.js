import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.pichomeTop.findMany({
                    where: {
                        id: req.query.id
                    }
                });

                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
            case "POST":
            try {
              await prisma.pichomeTop.create({
                data: {
                    image: req.body.image,
                    name: req.body.name,
                    links: req.body.links,
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
