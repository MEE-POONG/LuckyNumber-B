import { PrismaClient } from "@prisma/client"
import { TRUE } from "sass"
const prisma = new PrismaClient()

export default async function handler(req, res) {

    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.credit.findMany({ include: { user: true } });
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
            case 'POST':
            try {
                await prisma.credit.create({
                    data: {
                        addcreate: parseInt(req.body.addcreate),
                        amount: parseInt(req.body.amount),
                        userId: req.body.userId               
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
