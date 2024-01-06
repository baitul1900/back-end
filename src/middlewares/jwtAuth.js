// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     let Token = req.headers['token'];

//     jwt.verify(Token, "Src125469888", function (err, decoded) {
//         if (err) {
//             res.json({ status: "Unauthorized" })
//         } else {
//             let email = decoded['email'];
//             console.log(email);
//             req.headers.email = email;
//             next();
//         }
//     })
// };