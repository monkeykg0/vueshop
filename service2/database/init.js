const mongoose = require('mongoose')
const glob=require('glob')
const {resolve} = require('path')
const db = "mongodb://localhost/simlekg-db"
mongoose.Promise =  global.Promise
exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db,{useNewUrlParser: true })
    let maxConnectionTimes=0;
    return new Promise((resolve,reject)=>{
            //增加数据库连接的事件监听
        mongoose.connection.on('disconnected',()=>{
            if(maxConnectionTimes<3){
                maxConnectionTimes++;
                 mongoose.connect(db,{ useNewUrlParser: true })
            }else{
                reject();
                throw new Error('数据库连接超时')
            }      
        })
            //数据库出现错误的时候
        mongoose.connection.on('error',err=>{
            console.log(err)
            if(maxConnectionTimes<3){
                maxConnectionTimes++;
                 mongoose.connect(db,{ useNewUrlParser: true })
            }else{
                reject(err)
                throw new Error('数据库连接超时')
            }      
        })
            //链接打开的时候
        mongoose.connection.once('open',()=>{
            console.log('MongoDB Connected successfully!')
            resolve()  //连接成功
        })
    })    
}
exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}