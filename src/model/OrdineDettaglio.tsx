
 
export class  OrdineDettaglioErrors { 
 
    id_articolo_base: string = ""; 
    id_colore: string = ""; 
     
    qta: string = ""; 
    data_consegna: string = ""; 
    prezzo: string = ""; 

    public constructor(init?: Partial<OrdineDettaglioErrors>) {
        Object.assign(this, init);
      }
}

export class OrdineDettaglio {
 
    data_consegna: string = "";
 

    id_cliente : number = -1;
    id_articolo_base : number = -1;
    id_colore: number = -1;
    id_colore_2: number = -1;
    id_colore_3: number = -1;
    id_ordine  : number = -1;
    id_ordine_dettaglio : number = -1;
    prezzo : number = 0;
    qta : number = 0;
 
    evaso : boolean =false;
    
    nota: string = "";


    public constructor(init?: Partial<OrdineDettaglio>) {
        Object.assign(this, init);
      }
    
    public validateForm(formDataError: any)
    {
          let bValid = true;
          
          
          if (this.id_articolo_base === -1 )
          {
              formDataError.id_articolo_base = "Campo obbligatorio";
              bValid = false;
          }
  
          if (this.id_colore === -1 )
          {
              formDataError.id_colore = "Campo obbligatorio";
              bValid = false;
          }
  
          if (this.qta === 0 )
          {
              formDataError.qta = "Campo obbligatorio";
              bValid = false;
          }
 
          if (this.data_consegna ===  "")
          {
              formDataError.data_consegna = "Campo obbligatorio";
              bValid = false;
          }
          return bValid;
  
      }
  
  }