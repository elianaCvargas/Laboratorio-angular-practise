import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Documento } from '../clases/documento';
import { Especialidad } from '../clases/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {


    constructor(private firestore: AngularFirestore) { }

  public getAllEspecialidades(): Observable<Documento<Especialidad>[]> {
    let turnos = this.firestore.collection<Especialidad>('especialidades', (ref) =>
      ref
        .orderBy('nombre', 'desc')
    );

    let registros = turnos.snapshotChanges()
    .pipe(
      map((results: DocumentChangeAction<Especialidad>[]) => {
        return results.map((result) => {
          var data = result.payload.doc.data();
          return {
            id: result.payload.doc.id,
            data: {
              nombre: data.nombre,
              tipoEspecialidad: data.tipoEspecialidad
            } as Especialidad,
          };
        })
      })
    )

    return registros;
  }
}
