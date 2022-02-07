import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
  ) { }

  getImageFromWord(term: string) {
    return this.http.get<any>(`${environment.searchAPI.url}${term}&image_type=photo`).pipe(
      map((res) => {
        return res.hits;
      }));
  }
}
