import jwt from "jsonwebtoken";
import BaseError from "../helpers/base.error.js";
import db from "../db.js";
export const authJwtMdw = async (req, res, next) => {
   try {
      if (
         req.headers["authorization"] &&
         req.headers["authorization"].split(" ")[0] === "Bearer"
      ) {
         const token = req.headers["authorization"].split(" ")[1];
         if (!token) {
            throw BaseError.UnauthorizedError();
         }

         jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) throw BaseError.UnauthorizedError();
            req.body.userId = user.id;
         });
         const data = await db.query(
            `SELECT status FROM "user" WHERE id = $1`,
            [req.body.userId]
         );
         if (!data.rows[0]) {
            throw BaseError.UnauthorizedError("Your are deleted");
         }
         if (data.rows[0].status == "blocked") {
            throw BaseError.UnauthorizedError("Your email was blocked");
         }
         next();
      } else {
         throw BaseError.NotFound("Token is not found");
      }
   } catch (error) {
      next(error);
   }
};
