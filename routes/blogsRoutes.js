const express=require("express");
const router=express.Router();
const { showBlogs,showUserBlogs,addBlog,approveBlog,rejectBlog } = require("../controller/blogsController");

router.get("/getBlogs",showBlogs);
router.get("/getUserBlogs",showUserBlogs);
router.post("/addBlog",addBlog);
router.get("/approveBlog/:id",approveBlog);
router.get("/rejectBlog/:id",rejectBlog);

module.exports=router;