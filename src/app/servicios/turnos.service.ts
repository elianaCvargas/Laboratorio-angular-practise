import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Documento } from '../clases/documento';
import { Especialidad } from '../clases/especialidad';
import { Profesional } from '../clases/profesional';
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
              hora: data.hora,
              estado: data.estado,
              reseniaProfesional: data.reseniaProfesional,
              reseniaPaciente: data.reseniaPaciente,
              fecha: data.fecha
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

  public getAllEspecialidades2(): Observable<Especialidad[]> {
    let turnos = this.firestore.collection<Especialidad>('especialidades').valueChanges();
    return turnos;
  }

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

  public getAllTurnosByApellidoProfesional(apellido: String): Observable<Documento<Turnos>[]> {
    let turnos = this.firestore.collection<Turnos>('turnos', (ref) =>
      ref
        .where('apellido', '==', apellido)
        // .orderBy('apellido', 'desc')
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
              hora: data.hora,
              estado: data.estado,
              reseniaProfesional: data.reseniaProfesional,
              reseniaPaciente: data.reseniaPaciente,
              fecha: data.fecha,
              apellido: data.apellido,
            } as Turnos,
          };
        })
      })
    )

    return registros;
  }



}
