export default class Personaje {

  static get nombreHabs(){return ['Atletismo','Acrobacias','Juego de manos', 'Sigilo', 'Conocimiento arcano', 'Historia', 'Investigación', 'Naturaleza', 'Religión', 'Medicina', 'Percepción','Perspicacia','Supervivencia','Trato con animales','Engaño','Interpretación', 'Intimidación', 'Persuasión']}
  static get habMods(){return    [          0,           1,               1,        1,                     3,          3,               3,            3,          3,          4,            4,            4,              4,                   4,       5,               5,              5,           5 ]}
  static get minMaxCarPuntos(){return [-4, 7]}
  static get minMaxHabPuntos(){return [0, 8]}

  static get nombreCar(){
    return['Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduria', 'Carisma']
  }

  constructor(nombre = '', id = ''){
    this.nombre = nombre
    this.id = id
    this.caracteristicas = [0,0,0,0,0,0]
    this.habilidadesNivel = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  }

  habDatos(cual){
    return {
      nombre: Personaje.nombreCar[cual],
      nivel: this.habilidadesNivel[cual],
      carNombre: Personaje.nombreCar[cual],
      carNivel: this.caracteristicas[Personaje.habMods[cual]],
      total: this.caracteristicas[Personaje.habMods[cual]] + this.habilidadesNivel[cual]
    }
  }
}