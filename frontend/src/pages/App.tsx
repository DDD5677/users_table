import Table from "../components/Table/Table.tsx";
import "./App.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import UserService from "../server/user.ts";

function App() {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(false);
   const [page, setPage] = useState<number>(1);
   const [limit, setLimit] = useState<number>(5);
   const [pageSize, setPageSize] = useState<number>(5);
   const getUsers = async () => {
      setLoading(true);
      try {
         const response = await UserService.getUsers({ page, limit });
         const data = response.data;
         setUsers(data.users);
         setPage(+data.page);
         setPageSize(data.pageSize);
         setLimit(+data.limit);
      } catch (error) {
         if (axios.isAxiosError(error)) {
            console.log(error);
         } else {
            console.log("error");
         }
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      getUsers();
   }, [page, limit]);

   const handleChange = (event: ChangeEvent<unknown>, page: number) => {
      setPage(page);
   };
   const handleSelectChange = (event: SelectChangeEvent<number>) => {
      setLimit(+event.target.value);
      setPage(1);
   };
   return (
      <section>
         <div className="container">
            <Table users={users} getUsers={getUsers} loading={loading} />
            <div className="tableController">
               <Select
                  value={limit}
                  label="Limit"
                  onChange={handleSelectChange}
                  size="small"
                  variant="standard"
                  sx={{ width: "60px" }}
               >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
               </Select>
               <Pagination
                  count={pageSize}
                  page={page}
                  variant="outlined"
                  color="primary"
                  shape="rounded"
                  onChange={handleChange}
               />
            </div>
         </div>
      </section>
   );
}

export default App;
