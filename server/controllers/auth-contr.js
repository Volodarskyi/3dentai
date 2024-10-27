// import { generateRes, sendErrorLog } from '../utils/api.js';

// Controller to handle photo upload
import {generateRes, sendErrorLog} from "../utils/api.js";

// const registerController = async (req, res) => {
//     try {
//         console.log('authRegisterController-REQ:',req.body)
//
//         res.json(generateRes({data: 'register success'}));
//     } catch (err) {
//         sendErrorLog({
//             res,
//             url: 'POST api/auth/register',
//             err,
//         });
//     }
// };

const registerController = async (req, res) => {
        try {
            // const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({

                    result: 'ERROR',
                    data: null,
                    message: 'Register ERROR!',
                    details: 'Check e-mail,password and other data'
                });
            }

            const {
                firstName,
                secondName,
                email,
                password,
                avatar
            } = req.body

            const candidate = await User.findOne({email})
            console.log('AUTH_REGISTER_candidate:', candidate)

            if (candidate) {
                return res.status(400).json({
                    result: 'ERROR',
                    data: null,
                    message: 'Register ERROR!',
                    details: 'User with this e-mail already exist'
                })
            }

            const hashedPass = await bcrypt.hash(password, 12)

            const newUser = new User({
                email: email,
                password: hashedPass,
                firstName: firstName,
                secondName: secondName,
                role: 'user',
                phone: `PHONE FOR ${email}`,
                avatar: avatar,
                accessTo: []
            });

            const saveRes = await newUser.save()

            console.log('saveRes:', saveRes)

            res.status(201).json({
                result: 'SUCCESS',
                data: saveRes,
                message: 'New user added',
                details: `${firstName} ${secondName} saved to DB`
            })

        } catch (e) {
            console.log('ERROR (Auth.route-register):', e)
            await res.status(500).json({
                result: 'ERROR',
                data: null,
                message: 'Server ERROR!',
                details: 'In route:post register'
            })
        }
    }



export default {
    registerController
}
