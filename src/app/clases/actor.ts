// id nombre apellido sexo  fecha nac foto-->
export class Actor{

  public id: number;
  public nombre: string;
  public sexo: string;
  public fechaNacimiento: string;
  public foto: string;
  public nacionalidad: string;

  constructor(nombre: string, sexo: string, fechaNacimiento: string, foto: string, nacionalidad: string)
  {
    this.nombre = nombre;
    this.sexo = sexo;
    this.fechaNacimiento = fechaNacimiento;
    this.foto = foto;
    this.nacionalidad =  nacionalidad;
  }
}
