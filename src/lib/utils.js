

export const serializeNonPOJOs = (obj) =>{
  return structuredClone(obj)
}

/**
 * 
 * @param {String} fecha la fecha (aaaa-mm-dd hh:mi:ss.mil)
 * @param {String} dateStyle Tipo de formateo de fecha "full", "long", "medium", "short"
 * @param {String} timeStyle Tipo de formateo de hora "full", "long", "medium", "short"
 * @returns Cadena de texto con la fecha formateada de la forma indicada
 */
export function formateaFecha(fecha, dateStyle = 'short', timeStyle = 'short'){
  return new Intl.DateTimeFormat('es-ES', { 
    dateStyle,
    timeStyle
  }).format(new Date(fecha))
}

export function enteroAleatorio(min = 0, max = 100){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Genera número en exadecimal
 * @param {Number} n numero de cifras, 6 por defecto
 * @returns numero en exadecimal, de n cifras. 6 de forma predeterminada
 */
export function createHex(n = 6) {
  if (n < 1) return '0'
  var res = "";
  var values = "0123456789abcdef";
  for ( var i = 0; i < n; i++ ) {
    res += values.charAt(Math.floor(Math.random() * values.length));
  }
  return res;
}


/**
 * Crea una linea de CSS con un degradado de color.
 * @returns 
 */
export function generateRandomGradientCSS() {
  let deg = Math.floor(Math.random() *360);
  let gradient = "linear-gradient(" + deg + "deg, " + "#" + createHex() + ", " + "#" + createHex() +")";
  return gradient;
}


export const getImageURL = (coleccion, record, file, size = '0x0') => {
return `http://127.0.0.1:8090/api/files/${coleccion}/${record}/${file}?thumb=${size}`
}