 
 
export class  ConsegnaDettaglioErrors { 
 
    
 
    qta_evasa: string = ""; 
 

    public constructor(init?: Partial<ConsegnaDettaglioErrors>) {
        Object.assign(this, init);
      }
}

export class ConsegnaDettaglio {
  

    id_consegna_dettaglio  : number = -1;
    id_consegna  : number = -1;
    id_ordine_dettaglio: number = -1;
    consegnato:boolean = true;
    qta_evasa  : number = 0; 
    sconto  : number = 0; 
    
    public constructor(init?: Partial<ConsegnaDettaglio>) {
        Object.assign(this, init);
      }
    
    public validateForm(formDataError: ConsegnaDettaglioErrors)
    {
          let bValid = true;
          
    
 
          return bValid;
  
      }
  
  }