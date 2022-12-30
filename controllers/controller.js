// const db = require('../connection/conn')
// const util = require('util') //fix
// const query = util.promisify(db.query).bind(db) //fix

//import OP MUST!
const {Op} = require('sequelize');

//Import Sequelize
const { sequelize } = require('./../models');

//To generate UID
const { v4: uuidv4 } = require('uuid');

//import hashpassword
const {hashPassword, hashMatch } = require('./../lib/hashpassword') // hashpassword harus pake brace, karena dia module.export

//import jwt
const {jwt} = require('./../lib/jwt')
//Import models
const db = require('./../models/index');
const users = db.users
const users_address = db.users_address
const product = db.product
const product_image = db.product_image
const product_detail = db.product_detail
const product_size = db.product_size
const category = db.category
module.exports = {
    getProduct: async(req,res)=>{
        try {
            let getData = await product.findAll()
            console.log('getData', getData)
            if(getData.length > 0 ){
                res.status(201).send({
                    isError:false,
                    message:'get data success',
                    data : getData
                })
            }else{
                res.status(400).send({
                    isError:true,
                    message:'data not found',
                })
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).send({
                isError:true,
                message:"Get Data Failed!",
            })
        }
    },
    register: async (req, res) => {
        //rollback transaction
        const x = await sequelize.transaction()
        try {
            //step-1 
            let {username, password, email, confirmPassword} = req.body
            //Step-2 validasi
            //ini kalo kosong
            //kalo udah ada di front end gak usah, tapi bisa aja sih ditaro biar 2x validasi
            if(!username.length || !password.length || !email.length || !confirmPassword) return res.status(404).send({
                isError:true,
                message:"please fill all data",
                data:null
            })

            //validasi inputan user sesuai engga
            if(!/\S+@\S+\.\S+/.test(email)) return res.status(404).send({
                isError:true,
                message:'Email input is invalid',
                data:null
            })
            if(password.length<8) return res.status(404).send({
                isError:true,
                message:'Password is weak, must contain 8 or more',
                data:null
            })
            if(!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password)) return res.status(404).send({
                isError:true,
                message: 'Password must contain number!',
                data:null
            })
            if(password != confirmPassword) return res.status(404).send({
                isError:true,
                message: 'Password is not same!',
                data:null
            })

            //Step-3 Check ke database, username & email nya exist?
            let findUsernameAndEmail = await users.findOne({
                where: {
                    [Op.and]: [
                        { username: username },
                        { email: email }
                    ]
                }
            }, {transaction: x})
            
            console.log(findUsernameAndEmail)
            //isi console.log response nya, dia nyocokin ada gak username dan email yg sama
            //karena make Op.and
            // {
            //     dataValues: {
            //       id: 'e0d6ac2f-a6ea-44e6-a9f8-007486bb1254',
            //       username: 'jogja',
            //       email: 'jogja@gmail.com',
            //       password: '$2b$10$9klkpXM5lazy2rJdJsfADesPJqzNd1dH8wbJFQ1wto9/NRMJ43gvC',
            //       createdAt: 2022-12-26T10:18:32.000Z,
            //       updatedAt: 2022-12-26T10:18:32.000Z
            //     },
            //     _previousDataValues: {
            //       id: 'e0d6ac2f-a6ea-44e6-a9f8-007486bb1254',
            //       username: 'jogja',
            //       email: 'jogja@gmail.com',
            //       password: '$2b$10$9klkpXM5lazy2rJdJsfADesPJqzNd1dH8wbJFQ1wto9/NRMJ43gvC',
            //       createdAt: 2022-12-26T10:18:32.000Z,
            //       updatedAt: 2022-12-26T10:18:32.000Z
            //     },
            //     uniqno: 1,
            //     _changed: Set(0) {},
            //     _options: {
            //       isNewRecord: false,
            //       _schema: null,
            //       _schemaDelimiter: '',
            //       raw: true,
            //       attributes: [ 'id', 'username', 'email', 'password', 'createdAt', 'updatedAt' ]
            //     },
            //     isNewRecord: false
            //   }
            if(findUsernameAndEmail) return res.status(404).send({
                isError:true,
                message: "Username and Email already exist",
                data:null
            })
            
            //Step-4 Simpan data ke dalam database
            let asd = await users.create({id:uuidv4(),username, email, password: await hashPassword(password)}, {transaction: x})

            await users_address.create({receiver: username, address:"Kab. Bogor", phone_number:62, users_id:asd.dataValues.id}, {transaction: x})
            await x.commit()
            //Step-5 Kirim response
            
            res.status(201).send({
                isError:false,
                message:"Register Success",
                data:null
            })
        } catch (error) {
            console.log(error)
        }
    },
    login: async(req,res) =>{
        try {
            // Step-1 Ambil value dari req.body
            let {username, password} = req.body
            //validasi
            if(!username || !password) return res.status(404).send({
                isError: true,
                message: "Please fill data!",
                data:null
            })

            let hashedPassword = await hashMatch(password)
            // Step-2 Cari username dan password di database
            let x = await users.findOne({
                where :{
                    //kenapa op.and, biar kalo salah satu kosong, username atau pass, x = null
                    // kalo op.or dia nanti bisa sucess kalo ketemu username atau password bener
                    [Op.and]:[
                        {username: username},
                        {password: hashedPassword}
                    ]
                }
            })
            // !x atau bisa x ==null
            //harus pake return pak, kalo sebaris return nya gak usah braces
            //kalo gk make return res.status nya yg 201 ikut jalan
            if(!x) return res.status(404).send({
                isError:true,
                message:"Username or password wrong!",
                data: null
            })

            res.status(201).send({
                isError:false,
                message:"Login Success!",
                data: {id:x.dataValues.id, username:x.dataValues.username}
            })

        } catch (error) {
            console.log(error)
            res.status(500).send({
                isError:true,
                message:"Login Failed!",
            })
        }
          
    },
    postPicture: async(req,res) =>{
        try {
            let {gambar} = req.body
           
            // let x = [] buat testing for loop
            for(i=0;i<gambar.length;i++){
                    product_image.create({url:gambar[i], product_id:i+1})
                }
            // console.log(gambar.length)

            res.status(201).send({
                isError:false,
                message:"upload image success",
                data:null
            })
            
            // let post = await product_image.create({url:url})
        } catch (error) {
            console.log(error)
        }
            
    },
    postProduct: async(req,res) =>{
        try {
            let data = req.body
            const allData = []
            for (const item of data){
                item.malabi.map(async (d)=>{
                    if(item.category == 1){
                     await product.create({name:d, category_id: 1})   
                    }
                    if(item.category == 3){
                        await product.create({name:d, category_id: 3})   
                    } 
                })
            }
            res.status(201).send({
                isError:false,
                message:"upload product success",
                data: allData
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                isError:true,
                message:"Create Product Failed!",
            })
        }
    },
    postDetail: async(req,res) =>{
        try {
            let {cal, pri} = req.body
            let x = cal.length
            let y = pri.length
            
            let productId = 1
            for(i=0;i<cal.length;i++){
                product_detail.create({calories:cal[i],size_id:1,price:pri[i]*1000,product_id:productId})
                i++
                product_detail.create({calories:cal[i],size_id:2,price:pri[i]*1000,product_id:productId})
                i++
                product_detail.create({calories:cal[i],size_id:3,price:pri[i]*1000,product_id:productId})
                productId++
            }
            
            res.status(201).send({
                isError:false,
                message:'upload product detail success',
                data:null
            })
        } catch (error) {
          console.log(error)  
        }
    },
    postDetailSize: async(req,res) =>{
        try {
            let x =1
            for(i=1;i<=60;i++){
                product_size.create({product_detail_id:i, size_id:x})
                x++
                product_size.create({product_detail_id:i, size_id:x})
                x++
                product_size.create({product_detail_id:i, size_id:x})
                x=1
            }

            res.status(201).send({
                isError:false,
                message:"data updated",
                data:null
            })

        } catch (error) {
            console.log(error)
        }
    }
    
}