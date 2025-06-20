
export class QrCode {
    id_qrcode: number = -1;
    id_articolo_base: number = -1;
    id_colore: number = -1;
    id_colore_2: number = -1;
    id_colore_3: number = -1; 
    code: string = ""; 
 
    public static getCode(elenco_articoli,elenco_colori , qrcodeIstance:QrCode):string
    {
        let codArticolo = elenco_articoli.find( x => x.id_articolo_base === qrcodeIstance.id_articolo_base)?.codice
        let codColore =  elenco_colori.find( x => x.id_colore === qrcodeIstance.id_colore)?.codice


        if (qrcodeIstance.id_articolo_base  !== -1)
        {
            let codColore2 =  elenco_colori.find( x => x.id_colore === qrcodeIstance.id_colore_2)?.codice
            let codColore3 =  elenco_colori.find( x => x.id_colore === qrcodeIstance.id_colore_3)?.codice
            
            return "ART-" + codArticolo + "-" + codColore +  (codColore2 ?  "-" + codColore2 : "")  +  
                            (codColore3 ? "-" + codColore3  : "" );
                        }
        else
        {
             
            return "COL-" +  codColore ;
        }



    }


    public constructor(init?: Partial<QrCode>) {
        Object.assign(this, init);
      }
    

  
  }