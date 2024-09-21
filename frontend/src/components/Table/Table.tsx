import Paper from "@mui/material/Paper";
import "./Table.scss";
import {
   Checkbox,
   Chip,
   CircularProgress,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
} from "@mui/material";
import { formatDate } from "../../utils/dateFormatter";
import Toolbar from "../Toolbar/Toolbar";
import UseTable from "../../hooks/useTable";
import UserService from "../../server/user";
import { useState } from "react";

export default function DataTable({
   users,
   getUsers,
   loading,
}: {
   users: any;
   getUsers: () => Promise<void>;
   loading: boolean;
}) {
   const { selected, handleClick, handleSelectAllClick, setSelected } =
      UseTable(users);
   const [loadingBtn, setLoadingBtn] = useState(false);
   const rowCount = users.length;
   const numSelected = selected.length;

   const updateUser = async (status: "active" | "blocked") => {
      setLoadingBtn(true);
      try {
         await UserService.updateUser({
            status,
            usersId: selected,
         });
         getUsers();
      } catch (error) {
         console.log(error);
      } finally {
         setSelected([]);
         setLoadingBtn(false);
      }
   };
   const deleteUser = async () => {
      setLoadingBtn(true);
      try {
         await UserService.deleteUser(selected);
         getUsers();
      } catch (error) {
         console.log(error);
      } finally {
         setSelected([]);
         setLoadingBtn(false);
      }
   };

   return (
      <div>
         <Toolbar
            disabled={selected.length === 0 || loadingBtn}
            updateUser={updateUser}
            deleteUser={deleteUser}
         />
         {loading ? (
            <div className="loading">
               <CircularProgress />
            </div>
         ) : (
            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                     <TableRow sx={{ background: "#90D5FF" }}>
                        <TableCell padding="checkbox">
                           <Checkbox
                              color="primary"
                              indeterminate={
                                 numSelected > 0 && numSelected < rowCount
                              }
                              checked={rowCount > 0 && numSelected === rowCount}
                              onChange={handleSelectAllClick}
                              inputProps={{
                                 "aria-label": "select all desserts",
                              }}
                           />
                        </TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Last login date</TableCell>
                        <TableCell>Registration date</TableCell>
                     </TableRow>
                  </TableHead>

                  <TableBody>
                     {users.map((user: any, index: number) => {
                        const isItemSelected = selected.includes(user.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                           <TableRow
                              key={user.id}
                              onClick={() => handleClick(user.id)}
                              sx={{
                                 background: isItemSelected
                                    ? "#E0F3FF59"
                                    : "transparent",
                              }}
                           >
                              <TableCell
                                 component="th"
                                 padding="checkbox"
                                 scope="row"
                              >
                                 <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                       "aria-labelledby": labelId,
                                    }}
                                 />
                              </TableCell>
                              <TableCell component="th" scope="row">
                                 {user.id}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                 {user.name}
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                 <Chip
                                    label={user.status}
                                    color={
                                       user.status == "active"
                                          ? "success"
                                          : "error"
                                    }
                                    size="small"
                                    variant="outlined"
                                 />
                              </TableCell>
                              <TableCell>
                                 {formatDate(user.last_login)}
                              </TableCell>
                              <TableCell>
                                 {formatDate(user.created_at)}
                              </TableCell>
                           </TableRow>
                        );
                     })}
                  </TableBody>
               </Table>
            </TableContainer>
         )}
      </div>
   );
}
