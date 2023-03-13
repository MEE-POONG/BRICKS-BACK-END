import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'PUT':
            try {
                await prisma.contact.update({
                    where: {
                        id: req.query.id
                    },
                    data: {
                        address: req.body.address,
                        tel: req.body.tel,
                        email: req.body.email,
                        linkMap: req.body.linkMap,
                        facebook: req.body.facebook,
                        linkFacebook: req.body.linkFacebook,
                        line: req.body.line,
                        linkLine: req.body.linkLine,
                    }
                })
                
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                await prisma.contact.delete({
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
