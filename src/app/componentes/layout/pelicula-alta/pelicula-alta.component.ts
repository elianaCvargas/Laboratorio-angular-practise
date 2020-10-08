import { ParseLocation } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pelicula } from 'src/app/clases/pelicula';
import { PeliculasService } from 'src/app/servicios/peliculas.service';

@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.scss']
})
export class PeliculaAltaComponent implements OnInit {
  formularioGroup: FormGroup;

  constructor(public builder: FormBuilder, private peliculaService: PeliculasService) {
    this.formularioGroup = this.builder.group({
      titulo: [null, Validators.required],
      tipo: [null, Validators.required],
      cantidadPublico: [null, Validators.required],
      fechaEstreno: [null, Validators.required],
      foto: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    let titulo = this.formularioGroup.controls.titulo.value;
    let tipo = this.formularioGroup.controls.tipo.value;
    let cantidadPublico = this.formularioGroup.controls.cantidadPublico.value;
    let fechaEstreno = this.formularioGroup.controls.fechaEstreno.value;

    const pelicula = new Pelicula(titulo, tipo, fechaEstreno, cantidadPublico, "");
    this.peliculaService.create_NewMovie(pelicula);
  }

  subirArchivo(file: File) {
    console.log(file);

    this.peliculaService.upload_File(file[0].name, file).then((data) => {
      console.log("subido con exito!");
    }).catch((error) => {
      console.log(error);
    });
  }
}
