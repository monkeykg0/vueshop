// 使用mockjs来提供mock数据接口
import Mock from 'mockjs'
import data from './data.json'
//返回data接口
Mock.mock('/data',{code:200,data:data.data})
