import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Documento } from '../clases/documento';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private firestore: AngularFirestore,
  ) {}


  create_usuario(usuario: Usuario) {
    return this.firestore.collection('usuarios').add({ ...usuario })
    .then((data) => { console.log(data)})
    .catch((data) => { console.log(data)});
  }

  getUserByEmail(email: string): Observable<Documento<Usuario>> {
    return this.firestore
    .collection<Usuario>('usuarios', (ref) =>
      ref.where('email', '==', email)
    )
    .snapshotChanges()
    .pipe(
      map((results: DocumentChangeAction<Usuario>[]) => {
        var result = results[0];
        var data = result.payload.doc.data();

          return {
            id: result.payload.doc.id,
            data: data as Usuario,
          };
      })
    );
  }

  create_admin(usuario: Usuario) {
    return this.firestore.collection('usuarios').add({ ...usuario })
    .then((data) => { console.log(data)})
    .catch((data) => { console.log(data)});
  }

}
