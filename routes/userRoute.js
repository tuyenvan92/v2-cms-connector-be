const router = require('express').Router();

const User = require('../models/userModel')

const bcrypt = require('bcrypt')

// @route         GET api/user
// @description   GET User List
router.get('/', (_,res) => {
    const result = {
      data: [
        {
          "id": "1",
          "date": "11/11/2021",
          "title": "Blog Post",
          "category": "Architecture",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "image": "https://placeimg.com/640/480/arch"
        },
        {
          "id": "2",
          "date": "11/11/2021",
          "title": "Blog Post",
          "category": "Nature",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "image": "https://placeimg.com/640/480/nature"
        },
        {
          "id": "3",
          "date": "11/11/2021",
          "title": "Blog Post",
          "category": "Technology",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "image": "https://placeimg.com/640/480/tech"
        },
        {
          "id": "4",
          "date": "11/11/2021",
          "title": "Blog Post",
          "category": "Architecture",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "image": "https://placeimg.com/640/480/arch"
        },
        {
          "id": "5",
          "date": "11/11/2021",
          "title": "Blog Post",
          "category": "Nature",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "image": "https://placeimg.com/640/480/nature"
        },
        {
          "id": "6",
          "date": "11/11/2021",
          "title": "Blog Post",
          "category": "Technology",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "image": "https://placeimg.com/640/480/tech"
        }
      ],
    
    page: 1,
    limit: 10,
    total: 100,
    isSuccess: true
    };
    
    try {
        res.status(200).json(result)
    }
        catch(err) {
            res.status(500).json(error500)
    }
    
})

// @route         GET api/user/:id
// @description   GET single user
router.get('/:id', (req,res) => {
    console.log('single user:', req.params.id)
    res.send('get single user')
})

// @route     POST/api/user/register
// @desc      Register/User
// @access    Public
router.post('/register', async (req,res) => {
  console.log('register: ', req.body)
  const email = req.body.email
  const password = req.body.password
  const firstName = req.body?.firstName || ''
  const lastName = req.body?.lastName || ''

  // check email exists

  const isEmailExists = await User.findOne({ email: email })
  console.log('emaillll',email)

  if (isEmailExists) return res.status(400).json({
    msg: 'Email already exists',
    isSuccess: false
  })

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  // create a new user
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashPassword
  })

  try {
    await user.save()
    res.json({
      msg: 'Register successfully!',
      isSuccess: true
    })
  } catch (err) {
    res.status(400).json({
      msg:err,
      isSuccess: false
    })
  }
})

module.exports = router;