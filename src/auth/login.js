import express from 'express'
import bcrypt from "bcryptjs";
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'


const router = express.Router()
const prisma = new PrismaClient()

router.post('/login', async (req,res) => {
    const { useremail , userpassword } = req.body

    if(!useremail || !userpassword) return res.status(404).json({error : 'Missing information'})

    const user = await prisma.user.findUnique({ where : { email : useremail }})
    if(!user) return res.status(404).json({error : 'User not found'});

    const verifedPassword = await bcrypt.compare(userpassword,user.password)
    if(!verifedPassword) return res.status(404).json({error : 'Not Valid Password'});

    const token = jwt.sign( {id : user.id} , process.env.JWT_SECRET, {expiresIn : '1h'})

    res.status(201).json({token, user : {id : user.id , name : user.name ,email : user.email}})
})

export default router