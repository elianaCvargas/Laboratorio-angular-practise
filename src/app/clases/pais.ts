import { TipoPelicula } from '../enumClases/tipoPelicula';


export class Pais{

  public id: number;
  public name: string;
  // public alpha2Code: string;
  public capital: string;
  public population: number;
  public region: string;

  public flag: string;
  constructor(name: string, capital: string, region: string,  flag: string)
  {
    this.name =  name;
    // this.alpha2Code = alpha2Code;
    this.capital = capital;
    // this.population = population;
    this.region = region;
    this.flag =  flag;
  }
}
