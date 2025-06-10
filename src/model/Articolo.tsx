 
export class Articolo {

    id_articolo_base: number = -1;
    descrizione : string = "";
    codice: string = "";
    prezzo: number = 0; 
 

    public constructor(init?: Partial<Articolo>) {
        Object.assign(this, init);
      }
    

  
  }