import {
   delPayloadType,
   getUserPayloadType,
   loginPayloadType,
   regPayloadType,
   updPayloadlType,
} from "../utils/types";
import axios from "./axios";
const UserService = {
   register(user: regPayloadType) {
      return axios.post("/register", user);
   },
   login(user: loginPayloadType) {
      return axios.post("/login", user);
   },
   getUsers(payload: getUserPayloadType) {
      return axios.get("/user", {
         params: {
            page: payload.page,
            limit: payload.limit,
         },
      });
   },
   updateUser(payload: updPayloadlType) {
      return axios.patch(`/user`, {
         users: payload.usersId,
         status: payload.status,
      });
   },
   deleteUser(payload: delPayloadType) {
      return axios.delete("/user", {
         data: {
            users: payload,
         },
      });
   },
};

export default UserService;
