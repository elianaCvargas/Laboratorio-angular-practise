import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Documento } from '../clases/documento';
import { Horario } from '../clases/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(
    private firestore: AngularFirestore,
  ) {}

  create_horario(horario: Horario) {
    return this.firestore.collection('horarios').add({ ...horario });
  }

  public getHorariosByEmail(email: string, perfil: string): Observable<Documento<Horario>[]> {
    let horarios = this.firestore.collection<Horario>('horarios', (ref) =>
      ref
        .where(perfil.toLowerCase(), '==', email)
        .orderBy('fecha', 'desc')
    );

    let registros = horarios.snapshotChanges()
    .pipe(
      map((results: DocumentChangeAction<Horario>[]) => results.map((result) => {
        var data = result.payload.doc.data();
        return {
          id: result.payload.doc.id,
          data: {
            profesional: data.profesional,
            fecha: new Date(data.fecha.seconds * 1000),
            rango: data.rango
          } as Horario,
        };
      }))
    )

    return registros;
  }

}
