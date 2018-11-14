const mongoose=require('mongoose')//引入mongoose
const Schema=mongoose.Schema//声明schema
let ObjectId=Schema.Types.ObjectId//声明object类型
//创建用户schema
let userSchema=new Schema({
    UserId:ObjectId,
    suerName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
})
//根据schema创建一个model
mongoose.model('User',userSchema)