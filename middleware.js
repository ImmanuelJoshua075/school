
const sql=require('./src/users/model/connection');



module. exports = function (req, result, next) {
    let originalUrl = req.originalUrl;
    let token=req.token;
    let role=req.role;
    console.log("It is me");
    sql.query(`select*from UserSession where token='${token}'`,(err,res)=>{
      if(err){
        res.send("Token invalid");
      }
      else{
      console.log("-------------------"); 
    if((originalUrl == '/user' && req.method == 'POST')) 
    {
   
          next()
    }
    else 
    {
      sql.query("select role from Users", (err, res) => {
        if (err) {
          result.status(400).send({
            message: "Invalid request!"
          });
        }
    
        if(res.length == 0)
        {
          // console.log(res);
          result.status(400).send({
            message: "Invalid request!"
          });
        }
        else 
        { 
          console.log(role);
          // next();  

          if((originalUrl == '/get' && req.method == 'GET') || (originalUrl == '/delete/:id' && req.method == 'DELETE'))
          {
            if(role == 'admin')
            {
              next()
            }  
            else 
            {
              result.status(400).send({
                message: "Access denied sorry !"
              });
            }          
          }
          else if((originalUrl == '/user' && req.method == 'POST') || (originalUrl == '/login' && req.method == 'POST')  || (originalUrl == '/get' && req.method == 'GET'))
          {
            if(role == 'Principle')
            {
              console.log('Principle');
              next()
            }  
            else 
            {

              result.status(400).send({
                message: "Access denied retry!"
              });
            }          
          }
          else if((originalUrl == '/user' && req.method == 'POST') || (originalUrl == '/login' && req.method == 'POST')){
              if(role == 'teacher')
              {
                console.log("It is teacher");
                  next()
              }
              else{
              result.status(400).send({
                  message: "Access denied! and relogin"
                });
              }

          }
      }
      });
  }
    }
})
}



// module.exports=(req,res,next)=>{
//   let role=data.role;
//   let originalUrl=req.originalUrl;

//   if ((originalUrl=='/user' && req.method =='POST') ||(originalUrl=='/login' && req.method == 'POST')){
//       sql.query(`SELECT * FROM Users where role='${role}'`,(err,result)=>{
//           if (role == "Admin") {
//       next();
//   }
//   else 
//           {
//             result.status(400).send({
//               message: "Access denied!"
//             });
//           }     
//    if (role == "Principle") {
//       if ((originalUrl=='/user' && req.method =='POST') ||(originalUrl=='/login' && req.method == 'POST')) {
//         next();
//       } else {
//         res.json({ message: "Access Denied" });
//       }
//     } else if (role == "Teacher") {
//       if (originalUrl == "/user/login") {
//         next();
//       } else {
//         res.json({ message: "Access Denied" });
//       }
//     }
//   });
//   }else{
      
//   }
// }


// module. exports= function(options){
//   return function (req, res, next,role) {
//   let originalUrl = req.originalUrl;
//   // let email = req.body.email;
//   console.log(role)
//   sql.query("select * from Users ",(err,result)=>{
//     console.log(result);

//     if (originalUrl == "/user") {
//         sql.query(`SELECT * FROM Users where role='${role}'`,(err,result)=>{
//            if (data.role == "Admin") {
//           next();
//         } else if (data.role == "Principle") {
//           if (originalUrl == "/user" || originalUrl == "/login") {
//             next();
//           } else {
//             res.json({ message: "Access Denied" });
//           }
//         } else if (data.role == "Teacher") {
//           if (originalUrl == "/user" || originalUrl == "/login") {
//             next();
//           } else {
//             res.json({ message: "Access Denied" });
//           }
//         }
//       });
//       } else {
//         next();
     
//         // res.send("User Login MiddleWare")
//       }

//   })
// }
// };


// module. exports= async (req, res, next) => {
//   let originalUrl = req.originalUrl;
//   // let email = req.body.email;
//   const role=req.body.role;
//   console.log(role)
//   sql.query("select * from Users ",(err,result)=>{
//     console.log(result);

//     if (originalUrl == "/user") {
//         sql.query(`SELECT * FROM Users where role='${role}'`,(err,result)=>{
//            if (data.role == "Admin") {
//           next();
//         } else if (data.role == "Principle") {
//           if (originalUrl == "/user/login" || originalUrl == "/signup") {
//             next();
//           } else {
//             res.json({ message: "Access Denied" });
//           }
//         } else if (data.role == "Teacher") {
//           if (originalUrl == "/user/login") {
//             next();
//           } else {
//             res.json({ message: "Access Denied" });
//           }
//         }
//       });
//       } else {
//         next();
     
//         // res.send("User Login MiddleWare")
//       }

//   })
  
// };