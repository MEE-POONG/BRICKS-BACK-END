import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        // case 'GET':
        //     try {
        //         const data = await prisma.user.findMany({});
        //         res.status(200).json(data)
        //     } catch (error) {
        //         res.status(400).json({ success: false })
        //     }
        //     break
        case 'GET':
            try {
                let page = +req.query.page || 1;
                let pageSize = +req.query.pageSize || 10;
                let firstName = req.query.firstName;
                let lastName = req.query.lastName;
                let name = req.query.name;
                const data = await prisma.$transaction([
                    prisma.user.count({
                        where: { firstName: { contains: firstName }, lastName: { contains: lastName },name: { contains: name } },
                      }),
                    prisma.user.findMany({
                        where: { firstName: { contains: firstName }, lastName: { contains: lastName },name: { contains: name } },
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
                await prisma.user.create({
                    data: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        name: req.body.name,
                        tel: req.body.tel,
                        email: req.body.email,
                        password: req.body.password,
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
