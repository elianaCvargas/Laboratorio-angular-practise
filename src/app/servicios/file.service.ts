import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTask, UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { from, observable, Observable } from 'rxjs';
import { finalize, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private firestorage: AngularFireStorage,) { }

  subirArchivo(file: File): Observable<string> {
    console.log(file);
    const fileRef = this.referenciaCloudStorage(file.name);
    var task = this.upload_File(file.name, file);

    return from(task).pipe(
      switchMap((_) => fileRef.getDownloadURL()),
    );
  }

  upload_File(fileName: string, file: any)  {
    return this.firestorage.upload(fileName, file);
  }

  public referenciaCloudStorage(nombreArchivo: string) {
    return this.firestorage.ref(nombreArchivo);
  }
}
