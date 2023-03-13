import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'PUT':
            try {
                await prisma.homeTop.update({
                    where: {
                        id: req.query.id
                    },
                    data: {
                        title: req.body.title,
                        subTitle: req.body.subTitle,
                        image: req.body.image,
                    }
                })
                
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                await prisma.homeTop.delete({
                    where: {
                        id: req.query.id
                    }
                });
                
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
