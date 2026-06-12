import { USER_ROLES } from "../constants/user.constans";
import { IUser } from "./user";

export interface IloginResponse{

    code: number;
    payload: {
      token: string;
      user: IUser;
    };
    status: boolean;
    message: string;

}

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

