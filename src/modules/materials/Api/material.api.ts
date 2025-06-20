// src/services/api/MaterialApi.ts
import { Api } from "@/shared/global/Global";
import { MaterialFormType } from "../schemas/materials.schema";
import { isAxiosError } from "axios";

export class MaterialApi {
  static async getAll() {
    const { data } = await Api.get('/materials');
    return data;
  }

  static async getById(id: number) {
    const { data } = await Api.get(`/materials/${id}`);
    return data;
  }

  static async create(input: MaterialFormType) {
   try {
     const { data } = await Api.post('/materials', input);
    return data;
   } catch (error) {
    if(isAxiosError(error) && error.response){
        throw new Error(error.response.data)
    }
   }
  }

  static async update(id: number, input: MaterialFormType) {
    const { data } = await Api.patch(`/materials/${id}`, input);
    return data;
  }

  static async delete(id: number) {
    const { data } = await Api.delete(`/materials/${id}`);
    return data;
  }
}
