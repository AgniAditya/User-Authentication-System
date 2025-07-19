import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";

const router = express.Router()
const prisma = new PrismaClient()

router.post('/register', async (req,res) => {
    const { username ,useremail, userpassword } = req.body;

    if (!username || !useremail || !userpassword) {
        return res.status(400).json({ error: 'All fields required' });
    }

    const existing = await prisma.user.findUnique({
        where: { email: useremail }
    });

    if (existing) {
        return res.status(409).json({ error: 'E-mail already registered' });
    }

    const hashedpassowrd = await bcrypt.hash(userpassword,10)

    try{
        const user = await prisma.user.create({
            data : {
                name : username,
                email : useremail,
                password : hashedpassowrd
            }
        })
        const {password , ...safeUser} = user
        return res.status(201).json(safeUser)
    } catch(err){
        return res.status(500).json({ error: 'Server error' });
    }
})

export default router;