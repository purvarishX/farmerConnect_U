import { UserModel } from "../classes/User.model";

export interface ILoginResponse {
  message: string,
  data: UserModel,
  token: string
}