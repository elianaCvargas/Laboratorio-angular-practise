import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Documento } from '../clases/documento';
import { Profesional } from '../clases/profesional';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {

  constructor(
    private firestore: AngularFirestore,
  ) {}


  create_profesional(profesional: Profesional) {
    return this.firestore.collection('profesionales').add({ ...profesional })
    .then((data) => { console.log(data)})
    .catch((data) => { console.log(data)});
  }

  // getUserByEmail(email: string): Observable<Documento<Profesional>> {
  //   return this.firestore
  //   .collection<Profesional>('usuarios', (ref) =>
  //     ref.where('email', '==', email)
  //   )
  //   .snapshotChanges()
  //   .pipe(
  //     map((results: DocumentChangeAction<Profesional>[]) => {
  //       var result = results[0];
  //       var data = result.payload.doc.data();

  //         return {
  //           id: result.payload.doc.id,
  //           data: {
  //             nombre: data.nombre,
  //             apellido: data.apellido,
  //             email: data.email,
  //             tipoUsuario: data.tipoUsuario
  //           } as Profesional,
  //         };
  //     })
  //   );
  // }
}
