import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.addOnRate.findFirst({
                    where: {
                        id: req.query.id
                    }
                });
                prisma.$disconnect();
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try {
                await prisma.addOnRate.update({
                    where: {
                        id: req.query.id
                    },
                    data: {
                        length: parseInt(req.body.length),
                        addOn: parseInt(req.body.addOn),
                        productId: req.body.productId,
                    }
                })
                prisma.$disconnect();
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                await prisma.addOnRate.delete({
                    where: {
                        id: req.query.id
                    }
                });
                prisma.$disconnect();
                res.status(204).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
