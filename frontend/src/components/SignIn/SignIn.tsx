import { Button, TextField } from "@mui/material";
import "./SignIn.scss";
import { FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserService from "../../server/user";
import axios from "axios";
import { setItem } from "../../utils/localStorage";
function SignIn() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState();
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const login = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      try {
         const response = await UserService.login({ email, password });
         const data = response.data;
         setItem("token", data.token);
         navigate("/");
      } catch (error) {
         if (axios.isAxiosError(error)) {
            setError(error.response?.data.message);
         } else {
            console.log(error);
         }
      } finally {
         setLoading(false);
      }
   };
   return (
      <div className="SignIn">
         <form onSubmit={(e) => login(e)}>
            <h1>Sign In</h1>
            <TextField
               label="Email"
               type="email"
               variant="outlined"
               size="small"
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
               label="Password"
               type="password"
               variant="outlined"
               size="small"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            {error && <span className="error">{error}</span>}
            <Button variant="contained" disabled={loading} type="submit">
               Log In
            </Button>
            <div className="link">
               <NavLink to="/signup">Sign up</NavLink>
            </div>
         </form>
      </div>
   );
}

export default SignIn;
