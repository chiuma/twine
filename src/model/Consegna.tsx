 
import { CommonFunctions } from "../common/CommonFunctions";
import { ConsegnaDettaglio } from "./ConsegnaDettaglio";
 


export type Options = "Si" | "No" | "Tutti";

export class  ConsegnaFiltri { 
 
    id_cliente: number = -1; 
    hide: number = 0; 
 
    data_consegna_effettuata_al: string = ""; 
    data_consegna_effettuata_dal: string =  CommonFunctions.getDateInzioFormatted(); 

 
    
    public constructor(init?: Partial<ConsegnaFiltri>) {
        Object.assign(this, init);
 

      }
   
}


export class  ConsegnaTestataErrors { 
 
    id_cliente: string = ""; 
    data_consegna_effettuata: string = ""; 
     
    public constructor(init?: Partial<ConsegnaTestataErrors>) {
        Object.assign(this, init);
      }
   
}


export class Consegna {
 
    id_consegna : number = -1 ;
    id_cliente : number = -1 ;
    progressivo: string = "";
    importo_trasporto: number = 0;
    importo_manuale: number = 0;
    
    iva: number = 22;
    data_consegna_effettuata: string = "";
    nota: string = ""
    colli: number = 1;
    consegnaDettaglio : ConsegnaDettaglio[] = [];


    public constructor(init?: Partial<Consegna>) {
        Object.assign(this, init);
      }
    

      public validateForm(formDataError: any)
      {
            let bValid = true;
            
 
 
            if (this.data_consegna_effettuata ===  "")
            {
                formDataError.data_consegna_effettuata = "Campo obbligatorio";
                bValid = false;
            }
            return bValid;
    
        }
  
  }