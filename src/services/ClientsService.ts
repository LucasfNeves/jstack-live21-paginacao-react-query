/* eslint-disable quotes */
import { httpClient } from "./httpClient";
import { IPaginationResponse } from "./types";

interface IClient {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  email: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleManufacturer: string;
}

export class ClientsService {
  static async getAll(page: number = 1, perPage: number = 10) {
    const { data } = await httpClient.get<IPaginationResponse<IClient[]>>(
      "/clients",
      {
        params: {
          _page: page,
          _per_page: perPage,
        },
      },
    );

    return data;
  }
}
