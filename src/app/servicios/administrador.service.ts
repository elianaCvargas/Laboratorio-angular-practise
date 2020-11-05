import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Especialidad } from '../clases/especialidad';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {


  constructor(private firestore: AngularFirestore) { }

  create_especialidad(especialidad: Especialidad) {
    return this.firestore.collection('especialidades').add({ ...especialidad });
  }
}
