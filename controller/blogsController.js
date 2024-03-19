const Blogs = require("../model/blogsModel");
const User = require("../model/usersModel");
const { isAdmin } = require("./usersController");
const { mailSender } = require("../utils/mailSender");
const usersModel = require("../model/usersModel");

module.exports.showBlogs = async (req, res) => {
    const blogs = await Blogs.find();
    res.send(blogs);
};
module.exports.showUserBlogs = async (req,res)=>{
    const UserBlogs = await Blogs.find({user:req.session.user._id})/*.populate('user')*/;
    res.send(UserBlogs);
}

module.exports.addBlog = async (req, res) => {
    try{
        const { title, content, category } = req.body;
        const user = await isAdmin(req.session.user._id);
        if (user) {
            const blog = new Blogs({ 
                title: title,
                content: content,
                category: category,
                status: "Approved",
                user: req.session.user._id
            });
            await blog.save();
            const Bloguser = await User.findByIdAndUpdate(blog.user._id, { $push: { blogs: blog._id } });
            const userWithBlogs = await User.findById(Bloguser._id).populate('blogs');
            await userWithBlogs.save();
            res.redirect("/admin");
        } else {
            const blog = new Blogs({
                title: title,
                content: content,
                category: category,
                status: "Pending",
                user: req.session.user._id,
            });
            await blog.save();
            res.redirect("/user");
        }
    }catch(error)
    {
        console.log(error);
    }
};

module.exports.approveBlog = async (req,res)=>{
    try{
        const blog = await Blogs.findByIdAndUpdate(req.params.id, { status: "Approved" });
        const user = await User.findByIdAndUpdate(blog.user._id, { $push: { blogs: blog._id } });
        const userWithBlogs = await User.findById(user._id).populate('blogs');
        await userWithBlogs.save();
        const Bloguser = await User.findById(blog.user._id);
        const Usermail = Bloguser.mail;
        await mailSender(Usermail,"blog has been approved",`your blog has been approved by admin.`)
    }catch(error){
        console.log(error);
    } 

}
module.exports.rejectBlog = async (req,res)=>{
    try{
        const blog = await Blogs.findById(req.params.id);
        const Bloguser = await User.findById(blog.user._id);
        const Usermail = Bloguser.mail;
        await mailSender(Usermail,"blog has been Rejected",`your blog has been rejected by admin.`)
        await Blogs.findByIdAndDelete(req.params.id);
        const user = await User.findByIdAndUpdate(req.session.user._id,{$pull: {blogs:req.params.id}});
        user.save();
    }catch(error) {
        console.log(error);
    }
}