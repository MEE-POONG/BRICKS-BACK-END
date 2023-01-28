import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'PUT':
            try {
                await prisma.about.update({
                    where: {
                        id: req.query.id
                    },
                    data: {
                        headtitle: req.body.headtitle,
                        history: req.body.history,
                        subhistory: req.body.subhistory,
                        portfolio: req.body.portfolio,
                        subportfolio: req.body.subportfolio,
                        videotitle: req.body.videotitle,
                        video: req.body.video,
                        headpolicy: req.body.headpolicy,
                        subpolicy: req.body.subpolicy,
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
                await prisma.about.delete({
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
