import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
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
               color="error"
               variant="contained"
               onClick={() => updateUser("blocked")}
            >
               Block
            </Button>
            <Button
               sx={{ padding: "10px", minWidth: "0px" }}
               disabled={disabled}
               color="success"
               variant="contained"
               onClick={() => updateUser("active")}
            >
               <LockOpenIcon />
            </Button>

            <Button
               sx={{ padding: "10px", minWidth: "0px" }}
               disabled={disabled}
               color="error"
               variant="contained"
               onClick={() => deleteUser()}
            >
               <DeleteOutlineIcon />
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
