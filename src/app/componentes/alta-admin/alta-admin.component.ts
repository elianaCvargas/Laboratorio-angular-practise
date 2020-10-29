import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss']
})
export class AltaAdminComponent implements OnInit {
  adminGroup: FormGroup;


    constructor(public builder: FormBuilder) {
    this.adminGroup = this.builder.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      email: [null, [Validators.required]],
      password1: [null, [Validators.required, Validators.minLength(6)]],
      password2: [
        null,
        [
          Validators.required,
          this.passwordMatcher1.bind(this),
          Validators.minLength(6),
        ],
      ],

    });
  }

  private passwordMatcher1(control: FormControl): { [s: string]: boolean } {
    if (
      this.adminGroup &&
      control.value !== this.adminGroup.controls.password1.value
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

  get password1(): AbstractControl {
    return this.adminGroup.controls['password1'];
  }

  get password2(): AbstractControl {
    return this.adminGroup.controls['password2'];
  }

  get email(): AbstractControl {
    return this.adminGroup.controls['email'];
  }

  get nombreControl(): AbstractControl {
    return this.adminGroup.controls['nombre'];
  }

  get apellidoControl(): AbstractControl {
    return this.adminGroup.controls['apellido'];
  }


  ngOnInit(): void {
  }

}
