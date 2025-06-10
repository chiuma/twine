 

export class Provenienza {

    id_provenienza : number = -1;
    descrizione: string = "";
 
    public constructor(init?: Partial<Provenienza>) {
        Object.assign(this, init);
      }
   

  
  }