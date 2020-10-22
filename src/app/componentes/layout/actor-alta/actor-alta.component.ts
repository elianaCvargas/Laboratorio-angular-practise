import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { Actor } from 'src/app/clases/actor';
import { Pais } from 'src/app/clases/pais';
import { AllServicesService } from 'src/app/servicios/all-services.service';
import { PeliculasService } from 'src/app/servicios/peliculas.service';
import { DetalleTarjetaComponent } from '../../common/tarjetas/tarjeta/detalle-tarjeta/detalle-tarjeta.component';

@Component({
  selector: 'app-actor-alta',
  templateUrl: './actor-alta.component.html',
  styleUrls: ['./actor-alta.component.scss']
})
export class ActorAltaComponent implements OnInit {
  formularioGroup: FormGroup;
  public url: string;
  @Input() listado: Pais [];
  public pais: Pais;

  @Output() enviarPais: EventEmitter<Pais> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    public builder: FormBuilder,
    private actorService: PeliculasService
  ) {
    this.formularioGroup = this.builder.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      sexo: [null, Validators.required],
      fechaNacimiento: [null, Validators.required],
      nacionalidad: [null, Validators.required],
      // foto: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let nombre = this.formularioGroup.controls.nombre.value;
    let apellido = this.formularioGroup.controls.apellido.value;
    let sexo = this.formularioGroup.controls.sexo.value;
    let fechaNacimiento = this.formularioGroup.controls.fechaNacimiento.value;
    let nacionalidad = this.formularioGroup.controls.nacionalidad.value;
    // let foto = this.formularioGroup.controls.foto.value;

    const actor = new Actor(
      nombre,
      apellido,
      fechaNacimiento,
      sexo,
      nacionalidad
    );

    this.actorService.create_NewActor(actor)
    .then((ok) => { console.log("cargado con exito!")}).catch((error) => {
      console.log(error);
    });
  }

  subirArchivo(file: File) {
    console.log(file);
    const fileRef = this.actorService.referenciaCloudStorage(file[0].name);
    var task = this.actorService.upload_File(file[0].name, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          var downloadURL = fileRef.getDownloadURL().subscribe((data) => {
            this.url = data;
          });
        })
      )
      .subscribe(
        () => console.log('subidot  con exito!'),
        (error) => console.log(error)
      );

    // this.peliculaService
    //   .upload_File(file[0].name, file)
    //   .then((data) => {
    //     console.log('subido con exito!');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  onChange(pais){
    var particion = pais.split('-');
    const envio = new Pais(particion[0], particion[1], particion[2], particion[3]);
    this.enviarPais.emit(envio);
  }

}
