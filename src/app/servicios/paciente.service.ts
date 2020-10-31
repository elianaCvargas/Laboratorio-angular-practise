import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Paciente } from '../clases/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  constructor(
    private firestore: AngularFirestore,
    private route: Router,
    public dialog: MatDialog
  ) {}


  create_paciente(paciente: Paciente) {
    return this.firestore.collection('pacientes').add({ ...paciente })
    .then((data) => { console.log(data)})
    .catch((data) => { console.log(data)});
  }



}
