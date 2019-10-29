// Decode decodes an array of bytes into an object.
//  - fPort contains the LoRaWAN fPort number
//  - bytes is an array of bytes, e.g. [225, 230, 255, 0]
// The function must return an object, e.g. {"temperature": 22.5}

function Decode(fPort, bytes) {
  
   var UVindex = "NS";
   var presion = "NS";
   var temperatura = "NS";
   var luz_ambiente = "NS";
   var sonido = "NS";
   var humedad = "NS";
   var batteryLevel = "NS";
   var ECO2 = "NS";
   var TVOC = "NS";
   var hallState = "NS";
   var fieldStrength = "NS";
   var state = "No hay aviso";
    
   if (fPort == 1){
    
    var tipo1 = 0;
    tipo1 = bytes[0];
    switch(tipo1){
    	case 0:
          state = "Aviso, interfaz BLE desconectada";
         break;
          
        case 10:
          state = "Aviso sensor hall, dispositivo sustraido";
         break;
    }
    
    return{
          "state": state
    };
   
  }else if (fPort == 3){
    
    var indice = 0;
    var size = 0;
  	var tipo = 0;  
  
    while(indice < bytes.length){
      tipo = bytes[indice];
      indice++;
      size = bytes[indice];
      indice++;
      switch(tipo){
        case 1:
          UVindex = (bytes[indice]<<0);
          indice++;
          break;
          
        case 2:
          presion = ((bytes[indice + 3]<<24)+(bytes[indice + 2]<<16)+(bytes[indice + 1]<<8)+(bytes[indice]<<0))/1000;
          indice = indice + 4;
          break;
          
        case 3:
          temperatura = ((bytes[indice + 1]<<8)+(bytes[indice]<<0))/100;
          indice = indice + 2;
          break;
          
        case 4:
          luz_ambiente = ((bytes[indice + 3]<<24)+(bytes[indice + 2]<<16)+(bytes[indice + 1]<<8)+(bytes[indice]<<0))/1000;
          indice = indice + 4;
         break;
          
        case 5:
          sonido = ((bytes[indice + 1]<<8)+(bytes[indice]<<0))/100;
          indice = indice + 2;
          break;
          
        case 6:
          humedad = ((bytes[indice + 1]<<8)+(bytes[indice]<<0))/100;
          indice = indice + 2;
          break;
          
         case 7:
          batteryLevel = (bytes[indice]<<0);
          indice++;
          break;
         
         case 8:
          ECO2 = ((bytes[indice + 1]<<8)+(bytes[indice]<<0));
          indice = indice + 2;
          break;
         
         case 9:
          TVOC = ((bytes[indice + 1]<<8)+(bytes[indice]<<0));
          indice = indice + 2;
          break;
          
         case 10:
          hallState = (bytes[indice]<<0);
          indice++;
          break;
          
         case 11:
          fieldStrength = ((bytes[indice + 3]<<24)+(bytes[indice + 2]<<16)+(bytes[indice + 1]<<8)+(bytes[indice]<<0));
          indice = indice + 4;
          break;
          
         default:
          break;
      }
    }
    
    return {
        "Presión"             : presion.toString()+ " hPa", 
        "Temperatura"         : temperatura.toString()+" ºC",
        "Humedad"             : humedad.toString()+" %",
        "Luz Ambiente"        : luz_ambiente.toString()+ " Lux",
        "Sonido"              : sonido.toString()+ " dB",
        "Indice UV"           : UVindex.toString(), 
        "Nivel de Batería"    : batteryLevel.toString()+" %",
        "Estado Hall"         : hallState.toString(),
        "ECO2"                : ECO2.toString()+ " ppm",
        "TVOC"                : TVOC.toString()+ " ppb",
        "fieldStrength"       : fieldStrength.toString()+ " uT"
    };
    
  }else{
    return {
        "Estado": "Payload desconocido" 
    };
  }
  
}