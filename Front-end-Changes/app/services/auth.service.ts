import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  addlistItems(item) {
    return this.http.post<any>('route/item', item);
  }
  getUpdates() {
    return this.http.get<any>('route');
  }
  editItem(item) {
    return this.http.put<any>(`route/item/${item._id}`, item);
  }
  deleteItem(id) {
    console.log(id);
    return this.http.delete<any>('route/item/' + id);
  }
}
