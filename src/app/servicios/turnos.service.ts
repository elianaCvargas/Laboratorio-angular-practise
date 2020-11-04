import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Documento } from '../clases/documento';
import { Turnos } from '../clases/turnos';
import { EstadoTurno } from '../enumClases/estado-turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  public title: string;
  public message: string;

  constructor(
    private firestore: AngularFirestore,
    private route: Router,
    public dialog: MatDialog
  ) {}


  create_turno(turno: Turnos) {
    return this.firestore.collection('turnos').add({ ...turno });
  }

  public getAllTurnos(): Observable<Turnos[]> {
    let turnos = this.firestore.collection<Turnos>('turnos').valueChanges();
    let registros = this.firestore.collection<Turnos>('turnos').snapshotChanges();
    return turnos;
  }

  public getTurnosByEmailandPerfil(email: string, perfil: string): Observable<Documento<Turnos>[]> {
    let turnos = this.firestore.collection<Turnos>('turnos', (ref) =>
      ref
        .where(perfil.toLowerCase(), '==', email)
        .orderBy('estado', 'desc')
    );

    let registros = turnos.snapshotChanges()
    .pipe(
      map((results: DocumentChangeAction<Turnos>[]) => {
        return results.map((result) => {
          var data = result.payload.doc.data();
          return {
            id: result.payload.doc.id,
            data: {
              profesional: data.profesional,
              paciente: data.paciente,
              diaHora: data.diaHora,
              estado: data.estado,
              reseniaProfesional: data.reseniaProfesional,
              reseniaPaciente: data.reseniaPaciente,
            } as Turnos,
          };
        })
      })
    )

    return registros;
  }

  public updateRegistroTurnoById(doc: Documento<Turnos>) {
    this.firestore.doc('turnos/' + doc.id).update({...doc.data});
  }
}
