import "./SignUp.scss";
import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserService from "../../server/user";
import axios from "axios";
import { setItem } from "../../utils/localStorage";

function Register() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState();
   const navigate = useNavigate();
   const registerSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("register");
      try {
         const response = await UserService.register({ email, password, name });
         const data = response.data;

         setItem("token", data.token);
         navigate("/");
      } catch (error) {
         if (axios.isAxiosError(error)) {
            console.log(error);
            setError(error.response?.data.message);
         } else {
            console.log("error");
         }
      }
   };
   return (
      <div className="signUp">
         <form onSubmit={(e) => registerSubmit(e)}>
            <h1>Sign Up</h1>
            <TextField
               label="Name"
               type="text"
               variant="outlined"
               size="small"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <TextField
               label="Email"
               type="email"
               variant="outlined"
               size="small"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
               label="Password"
               type="password"
               variant="outlined"
               size="small"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            {error && <span className="error">{error}</span>}
            <Button variant="contained" type="submit">
               Sign Up
            </Button>
            <div className="link">
               <NavLink to="/signin">Sign in</NavLink>
            </div>
         </form>
      </div>
   );
}

export default Register;
