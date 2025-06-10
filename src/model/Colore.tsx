export class Colore {

    id_colore: number = -1;
    descrizione : string = "";
    codice: string = "";
    
 

    public constructor(init?: Partial<Colore>) {
        Object.assign(this, init);
      }
   

  
  }