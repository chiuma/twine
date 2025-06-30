
export class Utente {
  
    id_utente  : number = 0;     
    username: string = "";
    password: string = "";
    profile: string = "";
 
    
public constructor(init?: Partial<Utente>) {
    Object.assign(this, init);

//	console.log("constructor");
  }

 

}