import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { observable, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage)
  { }

  create_NewMovie(pelicula: any): Promise<DocumentReference> {
    return this.firestore.collection('peliculas').add({ ...pelicula });
  }

  upload_File(fileName: string, file: any)  {
    var storageRef = this.firestorage.ref('images');
    var ref = storageRef.child(fileName);
    return this.firestorage.upload(fileName, file[0]);
  }

  public referenciaCloudStorage(nombreArchivo: string) {
    return this.firestorage.ref(nombreArchivo);
  }

}
