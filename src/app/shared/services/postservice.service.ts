import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../const/interface';

@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  posturl = `${environment.baseurl}/posts.json`;
  postobj$: Subject<Ipost> = new Subject<Ipost>();
  postobjobj$: Observable<Ipost> = this.postobj$.asObservable()
  constructor(
    private _http: HttpClient
  ) { }



  fetchproducts(): Observable<any> {
    return this._http.get(this.posturl)
      .pipe(
        map((res: any) => {
          let postarr: Array<string> = [];
          for (const key in res) {

            postarr.push({ ...res[key], id: key })
          }
          return postarr
        })
      );
  }

  cretaepost(post: Ipost): Observable<any> {
    return this._http.post(this.posturl, post)

  }
  sendnext(ipost: Ipost) {
    this.postobj$.next(ipost)
  }

  onupdateser(updatepost: Ipost): Observable<Ipost> {
    let updateurl = `${environment.baseurl}/posts/${updatepost.id}.json`
    return this._http.patch<Ipost>(updateurl, updatepost)

  }
}
