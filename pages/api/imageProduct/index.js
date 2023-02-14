import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
        try {
            const data = await prisma.imageProduct.findMany({
                include: { products: true },
                where: {
                    id: req.query.id
                }
            });

            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({ success: false })
        }
        break
        case 'POST':
            try {
                await prisma.imageProduct.create({
                    data: {
                        // create: req.body.image.map((image) => ({
                        
                        // })),
                        productId: req.body.productId,
                        image:req.body.image,
                    }
                })
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
