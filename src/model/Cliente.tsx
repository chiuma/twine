export class  ClienteFiltri { 
 
 
    piva: string = ""; 
    comune: string = ""; 

    descrizione: string = ""; 
   
    
 
    
    public constructor(init?: Partial<ClienteFiltri>) {
        Object.assign(this, init);
        
      }
   
}


export class Cliente {

    id_cliente: number = -1;
    descrizione : string = "";
    piva: string = "";
    telefono: string = ""; 
    cellulare: string = ""; 
    codfiscale: string = ""; 
    email: string = ""; 
    cap: string = ""; 
    comune: string = ""; 
    provincia: string = ""; 
    indirizzo: string = ""; 

    public constructor(init?: Partial<Cliente>) {
        Object.assign(this, init);
      }
   

  
  }