const {Router} = require('express')
const User = require('../models/User')
const Learn = require('../models/Learn')
const router = Router();
const config = require("../config/config");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('express-validator');
const authMiddleware = require("../middleware/auth.middleware");
const roleList = require("../constants/roleList");
const {check, validationResult} = validator
const checker = require('../utils/checker');
const userRole = require('../constants/roleList');

// 'api/auth/register'
router.post('/register',
    [
        check('email', 'Incorrect e-mail').isEmail(),
        check('password', 'Incorrect password').isLength({min: 5}),
        check('firstName', 'Incorrect first name').isLength({min: 3}),
        check('secondName', 'Incorrect second name').isLength({min: 1})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
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
                accessTo:[]
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
    })

// 'api/auth/login'
router.post('/login',
    [
        check('email', 'Incorrect e-mail').isEmail(),
        check('password', 'Incorrect password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    result: 'ERROR',
                    data: null,
                    message: 'Auth ERROR!',
                    details: 'Login invalid data'
                });
            }
            const {
                email,
                password,
            } = req.body;

            console.log('Login body:', req.body);

            const user = await User.findOne({email});
            console.log('Login user:', user);

            if (!user) {
                return res.status(400).json({
                    result: 'ERROR',
                    data: null,
                    message: 'Auth ERROR!',
                    details: 'User is not found'
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            console.log('Login pass match:', isMatch);

            if (!isMatch) {
                return res.status(400).json({
                    result: 'ERROR',
                    data: null,
                    message: 'Auth ERROR!',
                    details: 'Wrong e-mail or password '
                });
            }

            const token = jwt.sign(
                {userId: user.id, first: user.firstName, second: user.secondName, role: user.role},
                config.JWT_SECRET,
                {expiresIn: '48h'}
            )

            console.log('Log token:', token)

            const data = {token, refToken: 'ref-token-test', userId: user.id}

            res.status(201).json({
                result: 'SUCCESS',
                data,
                message: 'Auth complete',
                details: `${user.firstName} ${user.secondName} is login`
            })

        } catch (e) {
            await res.status(500).json({
                result: 'ERROR',
                data: null,
                message: 'Server ERROR!',
                details: 'Login problem'
            })
        }
    })

// 'api/auth/delete'
router.delete('/delete', authMiddleware, async (req, res) => {
    const userId = req.query.id
    console.log("Auth DELETE USER:", userId)

    if(req.user.role !== roleList.ROLE_OWNER){
        console.log('CHECK USER ROLE:', req.user.role)
        console.log('Do not have permission:',req.user.role !== roleList.ROLE_OWNER)
        return res.status(405).json({
            result: 'ERROR',
            data: null,
            message: 'You dont have permission for this operation!',
            details: 'User with this e-mail already exist'
        })
    }

    try {
        const usersLearningProcess = await Learn.find({userId: userId})
        console.log('usersLearningProcess:', usersLearningProcess)

        async function deleteLearningProcess(learningArr) {
            // Map over each learning item to transform it
            return Promise.all(learningArr.map(async (learningItem) => {
                console.log(learningItem)
                try {
                    await Learn.findByIdAndDelete(learningItem._id)
                    return {deleteProcess: learningItem._id, result: true};
                } catch (error) {
                    console.error('Error delete user learning process:', error);
                    return {deleteProcess: learningItem._id, result: false};
                }
            }));
        }

        const deletedProcess = await deleteLearningProcess(usersLearningProcess);

        const result = await User.findByIdAndDelete(userId)
        console.log('delete user result:', result)

        res.status(200).json({
            result: 'SUCCESS',
            data: {deletedUser: userId, deletedProcess},
            message: `Delete User by id ${userId}`,
            details: `Removed from base`
        });
    } catch (e) {
        console.error('ERROR Delete User by id:', e);
        res.status(500).json({
            result: 'ERROR',
            data: null,
            message: 'Server ERROR!',
            details: String(e)
        });
    }
})

// 'api/auth/edit'
router.put('/edit',
    authMiddleware,
    async (req, res) => {
        try {
            const {
                id,
                avatar,
                role
            } = req.body

            const checkRolePermission = checker(req.user.role,[userRole.ROLE_OWNER])

            if(!checkRolePermission){
                await res.status(403).json({
                    result: 'ERROR',
                    data: null,
                    message: 'Update user: failed',
                    details: 'You do not have permission'
                })
                return;
            }

            const updatedResult = await User.findByIdAndUpdate(
                { _id: id },
                {
                    avatar,
                    role
                },
            );
            console.log("USER UPDATED:",updatedResult)

            res.status(200).json({
                result: 'SUCCESS',
                data: updatedResult,
                message: `Updated user id: ${id}`,
                details: `Updated`
            })
        } catch (e) {
            console.log('ERROR (Update-card-by-id):', e)
            await res.status(500).json({
                result: 'ERROR',
                data: null,
                message: 'Server ERROR!',
                details: 'Update user by id: Server ERROR'
            })
        }
    })

module.exports = router
