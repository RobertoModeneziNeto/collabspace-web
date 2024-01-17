import { AppResponse } from "../../Api/types";
import { IAddress } from "../../address/types";

interface User {
  id: string;
  name: string;
  bio: string;
  email: string;
  telephone: string | null;
  birthDate: string;
  avatarUrl: string | null;
  coverUrl: string | null;
  createdAt: string;
  address: IAddress[];
}

interface ISession {
  token: string;
  user: User;
}

interface ISessionRequest {
  email: string;
  password: string;
}

interface ISessionResponse extends AppResponse {
  data?: ISession;
}

export type { User, ISessionRequest, ISessionResponse };
