
export const tableUtility = {
 
    
    getComparator,
    stableSort
  
     
};

 


export type Order =   'asc' | 'desc';

export type AlignType =  'center' | 'inherit' | 'justify' | 'left' | 'right';

export interface HeadCell {
    
    align:AlignType;
    id: any;
    label: string;
    numeric: boolean;
  }

 
  
function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  
     
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
     
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
       
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
 
  
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    
    
       let b_val :any= null;
       let a_val :any= null;

       if ( typeof  b[orderBy] === "string" )
       {
            b_val =  b[orderBy] !== null ? String(b[orderBy]).toUpperCase() : ""  ;
            a_val = a[orderBy] !== null ? String(a[orderBy]).toUpperCase() : "" ;
        }
       else
       {
            b_val = b[orderBy];
            a_val = a[orderBy];
        }
 
     
   
     
     if (b_val < a_val) {
       return -1;
     }
     if (b_val > a_val) {
       return 1;
     }
     return 0;
   }


   
 
