
  
module.exports = (req, res, next) => {
    // if an already logged in user tries to access the login page it
    // redirects the user to the home page
     if (req.session.user.role !== "admin") {
        return res
        .status(403)
        .json({ errorMessage: "You must be authorize" })
        
      } 

      next();

        
      
    
};