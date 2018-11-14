var koa=require('koa')
var app=new koa()
const Router = require('koa-router')
let user=require('./appApi/User.js')
let router = new Router();
router.use('/user',user.routes())
app.use(router.routes())
app.use(router.allowedMethods())
const bodyParser = require('koa-bodyparser')
app.use(bodyParser());
const mongoose = require('mongoose')
const { connect ,initSchemas}=require('./database/init.js') 
app.use(async(ctx)=>{
    ctx.body='monkeykg is god'
})
app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})
;(async ()=>{
    await connect()
    initSchemas()
    const User = mongoose.model('User')
    let oneUser = new User({userName:'mulangfeng',password:'123456'})
    oneUser.save().then(()=>{
        console.log('插入成功')
    })
    let  users = await  User.find({})
    console.log('------------------')
    console.log(users)
    console.log('------------------')  
})()