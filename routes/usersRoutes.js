const express=require("express");
const router=express.Router();
const { mainPage,signinPage,loginPage,login,signin,user,logout,admin,username,getverified,verifyemail } = require("../controller/usersController");


router.get("/getUsername",username);
router.get("/",mainPage);
router.get("/user",user);
router.get("/signin",signinPage);
router.get("/login",loginPage);
router.post("/signin",signin);
router.post("/login",login);
router.get("/logout",logout);
router.get("/admin",admin)
router.post('/verifyemail', verifyemail );
router.get('/verifing/:id/:token', getverified );


module.exports=router;
