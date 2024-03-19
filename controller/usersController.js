const Users = require("../model/usersModel");
const jwt = require("jsonwebtoken");
const {mailSender} = require("../utils/mailSender");
const bcrypt = require("bcrypt");

module.exports.admin = (req, res) => {
  res.render("admin");
};

module.exports.mainPage = (req, res) => {
  res.render("home");
};

module.exports.user = (req, res) => {
  if (req.session.isLoggedIn) {
    res.render("user");
  } else {
    res.redirect("/signin");
  }
};

module.exports.signinPage = (req, res) => {
  res.render("signin");
};

module.exports.loginPage = (req, res) => {
  res.render("login");
};

module.exports.signin = async (req, res) => {
  try {
    const { mail, password } = req.body;
    let user = await Users.findOne({ mail: mail });

    if (!user) {
      res.send(
        '<script>alert("User Not Found"); window.location="/signin";</script>'
      );
    }
    if(user)
    {   
        if(await bcrypt.compare(password, user.password))
        {
            const isAdmin = await this.isAdmin(user._id);
            if (isAdmin) {
                req.session.user = user;
                console.log(req.session.user);  
                res.render("admin");
            }
            else {
                req.session.isLoggedIn = true;
                req.session.user= user;
                console.log(req.session.user);  
                res.render("user");
              }
        }
        else{
            res.send(
                '<script>alert("Password Invalid"); window.location="/signin";</script>'
              );
            }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports.login = async (req, res) => {
  const { username, password, mail } = req.body;
  if (username !== "" || password !== "" || mail !== "") {
    let user = await Users.findOne({ mail: mail });
    if (user) {
      res.send(
        '<script>alert("User Already Exist"); window.location="/signin";</script>'
      );
    }
    else
    {
        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = new Users({
          username: username,
          mail: mail,
          password: hashedPassword,
          isAdmin: false,
          blogs: [],
        });
        await newUser.save();
        // if (await bcrypt.compare(password, newUser.password)) {
            const token = jwt.sign( 
              { email: newUser.mail, id: newUser._id, isAdmin: newUser.isAdmin },
              process.env.JWT_SECRET,
              {
                expiresIn: "24h",
              }
            );
            newUser.token = token;
            await newUser.save();
            this.verifyemail(newUser.mail, newUser._id, newUser.token);
            // }
        res.redirect("/signin");
    }
  } else {
    res.send(
      '<script>alert("Enter Username or Password or E-mail"); window.location="/login";</script>'
    );
  }
};

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.render("home");
};

module.exports.username = async (req, res) => {
  const username = req.session.user.username;
  res.send(username);
};

module.exports.isAdmin = async (id) => {
  try {
    const user = await Users.findById(id);
    return user.isAdmin;
  } catch (error) {
    console.log(error);
  }
};

module.exports.verifyemail = async (mail,id,token) => {
    try {
    await mailSender(
      mail,
      "Verification Email",
      `click on this link to approve the mail http://localhost:3333/verifing/${id}/${token} `
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports.getverified = async (req, res) => {
  const { id, token } = req.params;

  try {
    const user = await Users.findById(id);
    console.log(user);
    if (user.token === token) {
      user.isVerified = true;
      await user.save();
      res.send("User Verified");
    }
    
  } catch (error) {
    console.error(error);
  }
};
