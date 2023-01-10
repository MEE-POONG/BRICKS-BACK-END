import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.customer.findFirst({
                    // include: {
                    //     category: true,
                    //     unit: true
                    // },
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
                await prisma.customer.update({
                    where: {
                        id: req.query.id
                    },
                    data: {
                        positionId: req.body.positionId,
                        username: req.body.username,
                        password: req.body.password,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        img: req.body.img,
                        facebook: req.body.facebook,
                        line: req.body.line,
                        intragarm: req.body.intragarm,
                        addressOne: req.body.addressOne,
                        addressTwo: req.body.addressTwo,
                        addressThree: req.body.addressThree,
                        city: req.body.city,
                        postalCode: req.body.postalCode,
                        status: req.body.status,
                        // district: req.body.district,
                        // subDistrict: req.body.subDistrict,
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
                await prisma.customer.delete({
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
