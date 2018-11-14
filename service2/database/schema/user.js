const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
const Schema=mongoose.Schema
let ObjectId=Schema.Types.ObjectId
const userSchema=new Schema({
    UserId:ObjectId,
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
})
//每次存储数据时都要执行
// userSchema.pre('save', function(next){
//     //let user = this
//     console.log(this)
//     bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
//         if(err) return next(err)
//         bcrypt.hash(this.password,salt, (err,hash)=>{
//             if(err) return next(err)
//             this.password = hash
//             next()
//         }) 
//     })
// })
//根据schema 创建model
mongoose.model('User',userSchema)