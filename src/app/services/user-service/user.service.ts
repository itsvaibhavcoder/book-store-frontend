import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http-service/http-service.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpServiceService) { }
  loginSignUpAppiCall(endPoint:string, payload: any){
    return this.httpService.postApiCall(endPoint, payload)
  }
}
