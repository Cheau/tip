import prisma from '../../../lib/prisma'

async function create(req, res) {
    const {
        email, name, password, rePassword,
    } = req.body
    if (password !== rePassword) {
        res.status()
    }
    const result = await prisma.user.create({
        data: {
            email, name, password,
        },
    })
    res.status(200).json(result)
}

export default function handler(req, res) {
    if (req.method === 'POST') create(req, res)
}
