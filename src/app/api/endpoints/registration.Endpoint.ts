import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegistrationResource } from "../models/registration.model";
import { CreateRegistrationDto } from "../models/registration-request.model";
import { UpdateRegistrationDto } from "../models/registration-request.model";

@Injectable({
    providedIn: 'root',
  })

export class RegistrationEndpoint{
    baseUrl = `http://localhost:8000/api/user`;
    constructor(private readonly httpClient: HttpClient){}
    
    list() {
        return this.httpClient.get<{ data: RegistrationResource[] }>(`${this.baseUrl}`);
      }
      single(id: number) {
        return this.httpClient.get<{ data: RegistrationResource }>(`${this.baseUrl}/${id}`);
      }
      create(data: CreateRegistrationDto) {
        return this.httpClient.post<{ data: RegistrationResource }>(`${this.baseUrl}`, data);
      }
      update(id: number, data: UpdateRegistrationDto) {
        return this.httpClient.put<{ data: RegistrationResource }>(`${this.baseUrl}/${id}`, data);
      }
    
      delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
      }
}