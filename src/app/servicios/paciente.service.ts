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
  public title: string;
  public message: string;

  constructor(
    private firestore: AngularFirestore,
    private firestorage: AngularFireStorage,
    private route: Router,
    public dialog: MatDialog
  ) {}


  create_paciente(paciente: Paciente) {
    return this.firestore.collection('pacientes').add({ ...paciente });
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
