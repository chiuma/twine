
import { CommonFunctions } from "../common/CommonFunctions";
import { OrdineDettaglio } from "./OrdineDettaglio";
export type Options = "Si" | "No" | "Tutti";

export class  OrdineFiltri { 
 
    id_cliente: number = -1; 
    id_articolo_base: number = -1; 
    id_provenienza: number = -1; 
    data_consegna_al: string = ""; 
    data_consegna_dal: string =    CommonFunctions.getDateInzioFormatted(); 

    data_ricezione_al: string = ""; 
    data_ricezione_dal: string = ""; 
    
    evaso:  Options  = "No";
    consegnato:  Options  = "No";
    
    iniziali_cliente:string = "";

    public constructor(init?: Partial<OrdineFiltri>) {
        Object.assign(this, init);
        
      }
   
}


export class  OrdineTestataErrors { 
 
    id_cliente: string = ""; 
    data_ricezione: string = ""; 
    data_consegna: string = ""; 
    public constructor(init?: Partial<OrdineTestataErrors>) {
        Object.assign(this, init);
      }
   
}


export class Ordine {
 
    id_cliente: number = -1 ;
    id_provenienza: number = -1;
    data_ricezione: string = "";
    data_consegna: string = ""; 
    id_ordine: number = -1 ;
    ordineDettaglio : OrdineDettaglio[] = [];


    public constructor(init?: Partial<Ordine>) {
        Object.assign(this, init);
      }
    

      public validateForm(formDataError: any)
      {
            let bValid = true;
            
            
            if (this.id_cliente === -1 )
            {
                formDataError.id_cliente = "Campo obbligatorio";
                bValid = false;
            }
    
 
            if (this.data_ricezione ===  "")
            {
                formDataError.data_ricezione = "Campo obbligatorio";
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