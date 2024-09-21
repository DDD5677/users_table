import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import "./Toolbar.scss";
import { removeItem } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
function Toolbar({
   disabled,
   updateUser,
   deleteUser,
}: {
   disabled: boolean;
   updateUser: Function;
   deleteUser: Function;
}) {
   const navigate = useNavigate();
   const logout = () => {
      removeItem("token");
      navigate("/signin");
   };
   return (
      <div className="toolbar">
         <div className="btns">
            <Button
               disabled={disabled}
               color="success"
               variant="contained"
               onClick={() => updateUser("active")}
            >
               Unblock
            </Button>
            <Button
               sx={{ padding: "10px", minWidth: "0px" }}
               disabled={disabled}
               color="info"
               variant="contained"
               onClick={() => updateUser("blocked")}
            >
               <LockIcon />
            </Button>
            <Button
               sx={{ padding: "10px", minWidth: "0px" }}
               disabled={disabled}
               color="error"
               variant="contained"
               onClick={() => deleteUser()}
            >
               <DeleteIcon />
            </Button>
         </div>
         <Button
            sx={{ padding: "10px", minWidth: "0px" }}
            color="error"
            variant="outlined"
            onClick={() => logout()}
         >
            Logout
         </Button>
      </div>
   );
}

export default Toolbar;
