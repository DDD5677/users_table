export interface updPayloadlType {
   usersId: readonly number[];
   status: "active" | "blocked";
}
export interface regPayloadType {
   name: string;
   email: string;
   password: string;
}
export interface loginPayloadType {
   email: string;
   password: string;
}
export interface getUserPayloadType {
   page: number;
   limit: number;
}
export type delPayloadType = readonly number[];
