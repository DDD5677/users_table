import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BaseError from "../helpers/base.error.js";

class UserController {
   async registerUser(req, res, next) {
      try {
         const { name, email, password } = req.body;
         const salt = bcrypt.genSaltSync(10);
         const hashPassword = bcrypt.hashSync(password, salt);
         const user = await db.query(
            `INSERT INTO "user" (name, email, password) values ($1, $2, $3) RETURNING id, name, email,status, created_at, last_login`,
            [name, email, hashPassword]
         );
         const token = jwt.sign(
            { id: user.rows[0].id },
            String(process.env.TOKEN_SECRET),
            {
               expiresIn: "1h",
            }
         );
         res.status(200).json({ user: user.rows[0], token });
      } catch (error) {
         next(error);
      }
   }
   async loginUser(req, res, next) {
      try {
         const { email, password } = req.body;
         let user = await db.query(`SELECT * FROM "user" WHERE email = $1`, [
            email,
         ]);
         user = user.rows[0];
         if (!user) {
            throw BaseError.BadRequest("User with given email is not found");
         }
         if (user.status == "blocked") {
            throw BaseError.BadRequest("Your email was blocked");
         }
         if (!bcrypt.compareSync(password, user.password)) {
            throw BaseError.BadRequest("Password is wrong");
         }
         const token = jwt.sign(
            { id: user.id },
            String(process.env.TOKEN_SECRET),
            {
               expiresIn: "1h",
            }
         );
         const updatedUser = await db.query(
            `UPDATE "user" SET last_login = NOW() WHERE id = $1 RETURNING id, name, email,status, created_at, last_login`,
            [user.id]
         );
         res.status(200).json({ token, user: updatedUser.rows[0] });
      } catch (error) {
         next(error);
      }
   }
   async getUsers(req, res, next) {
      try {
         const { page = 1, limit = 10 } = req.query;
         const countData = await db.query(
            `SELECT count(*) AS users_count FROM "user"`
         );
         const usersCount = countData.rows[0].users_count;
         const pageSize = Math.ceil(usersCount / limit);
         const users = await db.query(
            `SELECT id, name, email,status, created_at, last_login FROM "user" ORDER BY id LIMIT $1 OFFSET $2`,
            [limit, (page - 1) * limit]
         );
         res.status(200).json({ users: users.rows, page, limit, pageSize });
      } catch (error) {
         next(error);
      }
   }

   async getOneUser(req, res, next) {
      try {
         const id = req.params.id;
         const user = await db.query(`SELECT * FROM "user" WHERE id = $1`, [
            id,
         ]);
         res.status(200).json(user.rows[0]);
      } catch (error) {
         next(error);
      }
   }
   updateUser(req, res, next) {
      const { status, users } = req.body;
      Promise.all(
         users.map((id) => {
            return new Promise(async (resolve, reject) => {
               try {
                  const user = await db.query(
                     `UPDATE "user" set status = $1 where id = $2 RETURNING *`,
                     [status, id]
                  );
                  resolve(user.rows[0]);
               } catch (error) {
                  reject(error);
               }
            });
         })
      )
         .then((result) => {
            res.status(200).send("user updated successfully");
         })
         .catch((error) => {
            next(error);
         });
   }
   deleteUser(req, res, next) {
      const { users } = req.body;
      Promise.all(
         users.map((id) => {
            return new Promise(async (resolve, reject) => {
               try {
                  const user = await db.query(
                     `DELETE FROM "user" WHERE id = $1`,
                     [id]
                  );
                  resolve(user.rows[0]);
               } catch (error) {
                  reject(error);
               }
            });
         })
      )
         .then((result) => {
            res.status(200).send("user updated successfully");
         })
         .catch((error) => {
            next(error);
         });
   }
}

export default new UserController();
