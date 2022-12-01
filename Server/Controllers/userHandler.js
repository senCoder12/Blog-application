import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../Models/user.model.js';
import dotenv from "dotenv"

dotenv.config();

export const signup =  async (req, res) => {
    const {email, password, firstName, lastName} = req.body;
    try {
        const oldUser = await userModel.findOne({email});
        if (oldUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await userModel.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({
            email,
            id: newUser._id
        },process.env.JWT_SECRET_KEY,{
            expiresIn: "1hr"
        })
        res.status(201).json({
            result : newUser,
            token
        }) 
    } catch (err) {
        console.log(err)
        res.status(500).send({
            "message": "signup failed"
        })
    }
}

export const signin =  async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.find({email});
        if(user && user.length >0) {
            const isValidPassword = await bcrypt.compare(password,user[0].password);
            if(isValidPassword) {
                const token = jwt.sign({
                    email,
                    id: user[0]._id
                },process.env.JWT_SECRET_KEY,{
                    expiresIn: "1hr"
                })
                res.status(200).send({
                    token,
                    result: user,
                    "message": "Login successful"
                })
            }else {
                res.status(404).send({
                    "message": "Invalid user"
                })
            }
        }else {
            res.status(404).send({
                "message": "Wrong credential"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            "message": "Something went wrong"
        })
    }
}
