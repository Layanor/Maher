import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  // url = '/Call37s/Download/';

  constructor(private http: HttpClient) {}

  //   downloadFiles(id): Observable<Blob> {
  //     // const options = new RequestOptions({responseType: ResponseContentType.Blob });

  //     // return this.http.get(this.url + '/' + id, options)
  //     //     .map(res => res.blob())
  //     //     .catch(this.handleError)
  // }
  // handleError(handleError: any): Observable<Blob> {
  //   throw new Error('Method not implemented.');
  // }
  download(url: string): Observable<Blob> {
    const file = this.http.post(url, null, {
      responseType: 'blob'
    });
    // console.log(file);
    return file;
  }
  // public downloadFile(docFile: string): Observable<Blob> {
  //   return this.http.get(this.url + '/GetFile?docFile=' + docFile, {
  //     responseType: 'blob',
  //   });
  // }
  // public downloadImage(image: string): Observable<Blob> {
  //   return this.http.get(this.url + '/GetImage?image=' + image, {
  //     responseType: 'blob',
  //   });
  // }
  // public getFiles(): Observable<any[]> {
  //   return this.http.get<any[]>(this.url + '/GetFileDetails');
  // }
  // AddFileDetails(data: FormData): Observable<string> {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   const httpOptions = {
  //     headers: headers,
  //   };
  //   return this.http.post<string>(
  //     this.url + '/AddFileDetails/',
  //     data,
  //     httpOptions
  //   );
  // }
}
