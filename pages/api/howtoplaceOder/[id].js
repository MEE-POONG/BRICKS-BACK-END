import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'PUT':
            try {
                await prisma.howtoplaceOder.update({
                    where: {
                        id: req.query.id
                    },
                    data: {
                        headtitle: req.body.headtitle,
                        title: req.body.title,
                        steps1: req.body.steps1,
                        substeps1: req.body.substeps1,
                        steps2: req.body.steps2,
                        substeps2: req.body.substeps2,
                        steps3: req.body.steps3,
                        substeps3: req.body.substeps3,
                        steps4: req.body.steps4,
                        substeps4: req.body.substeps4,
                        steps5: req.body.steps5,
                        substeps5: req.body.substeps5,
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
                await prisma.howtoplaceOder.delete({
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
