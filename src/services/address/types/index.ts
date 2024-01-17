import { AppResponse } from "../../Api/types";

interface IAddress {
  id: string;
  user_id: string;
  cep: string | null;
  country: string | null;
  province: string | null;
  city: string | null;
  street: string | null;
}

interface ICreateAddressRequest {
  cep?: string;
  country?: string;
  province?: string;
  city?: string;
  street?: string;
}

interface ICreateAddressReponse extends AppResponse {
  data?: IAddress;
}

interface IUpdateAddressRequest {
  id: string;
  cep?: string;
  country?: string;
  province?: string;
  city?: string;
  street?: string;
}

type IUpdateAddressResponse = AppResponse;

export type {
  IAddress,
  ICreateAddressRequest,
  ICreateAddressReponse,
  IUpdateAddressRequest,
  IUpdateAddressResponse,
};
