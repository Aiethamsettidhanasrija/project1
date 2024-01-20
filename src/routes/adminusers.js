const express=require('express');//use the express here..
const router=express.Router();//make a variable router by assigning it to express.Router()
const usercontroller=require('../Controllers/usercontroller');//calling the controllers files.


router.get('/index1',usercontroller.index1);//using get api
router.post('/index2',usercontroller.index2);//using post api
router.put("/index3",usercontroller.index3);//using put api
router.delete("/index4",usercontroller.index4);//using delete api

module.exports=router;//in order to link to the main file you need to export it first.
