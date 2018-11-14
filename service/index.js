var Koa=require('koa');
var app=new Koa();
const mongoose = require('mongoose')
//映入connect
const {connect,initSchemas}=require('./database/init.js')
app.use(async(ctx)=>{
    ctx.body='hello koa2'
})
app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})
//立即执行函数
;(async()=>{
    await connect()
    initSchemas()
    const User=mongoose.model('User')
    let oneUser=new User({userName:"monkeykg000",password:"123456"})
    oneUser.create().then(()=>{
        console.log('插入成功')
    })
    let users=await User.findOne({}).exec()
    console.log('------------------')
    console.log(users)
    console.log('------------------')  
})()