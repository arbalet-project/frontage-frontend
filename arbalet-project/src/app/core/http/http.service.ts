import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

// TODO : move this.
class Status {
  is_up : string;
  protocol_version: number;
}

class StatusFacade {
  current_app: string;
  current_time: string;
  next_on_time: string;
  height: number;
  width : number;
  is_forced: boolean;
  is_usable: boolean;
  state: string;
  version: string;
}

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private baseUrl = environment.backEndBaseUrl;
  private statusServerUrl = "/status/is_up"; // TODO : Model for this.
  private statusFacadeUrl = "/frontage/status";

  constructor(private http: HttpClient) {}

  public statusServer(): Observable<Status> {
    return this.http.get<Status>(this.baseUrl + this.statusServerUrl);
  }

  public statusFacade() : Observable<StatusFacade> {
    return this.http.get<StatusFacade>(this.baseUrl + this.statusFacadeUrl);
  }
}
