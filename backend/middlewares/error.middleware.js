import BaseError from "../helpers/base.error.js";

export default function (err, req, res, next) {
   let errors = {};
   if (err instanceof BaseError) {
      return res.status(err.status).json({
         message: err.message,
         errors: err.errors,
      });
   }
   if (err.code == 23505) {
      return res.status(400).json({
         message: "This email is already registered",
         errors: err,
      });
   }
   return res.status(500).json({
      message: "Server error",
      errors: err,
   });
}
