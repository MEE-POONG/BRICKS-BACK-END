import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        // case 'GET':
        //     try {
        //         const data = await prisma.products.findMany({});
        //         res.status(200).json(data)
        //     } catch (error) {
        //         res.status(400).json({ success: false })
        //     }
        //     break
        case 'GET':
            try {
                let page = +req.query.page || 1;
                let pageSize = +req.query.pageSize || 10;
                const data = await prisma.$transaction([
                    prisma.products.count(),
                    prisma.products.findMany({
                        include: { subType: true },
                        skip: (page - 1) * pageSize,
                        take: pageSize,
                    })
                ])
                const totalPage = Math.ceil(data[0] / pageSize);
                res.status(200).json({ data: data[1], page, pageSize, totalPage })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                await prisma.products.create({
                    data: {
                        image: req.body.image,
                        name: req.body.name,
                        detail: req.body.detail,
                        subTypeId: req.body.subTypeId,
                        price: parseInt(req.body.price),
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
