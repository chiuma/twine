/***
 * 
 * 
 * 
create view qr_ordini_data_consegna as
SELECT min(data_consegna ) as data_consegna_min,  
max(data_consegna ) as data_consegna_max,
 id_ordine  
 FROM ordini_dettaglio
group by    id_ordine
 */
export const CommonFunctions = {
    CompareDate  ,
    FormatDate,
    FormatDateDDMMYYYY,
    getDateNowFormatted,
    getDateInzioFormatted,
    isValidYear,
    titleCase
    
  
};

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

function isValidYear( dataYYYY_ )
{ 
try
{
    if ( dataYYYY_ === "") return true 
        let anno =  Number(dataYYYY_.substring(0,dataYYYY_.indexOf('-'))  );

        
        if ( anno  > 2020 &&  anno  < 2050    )   return true;
        else return false;
  }
    catch(error) 
    {   
        return false;
    }

}

function getDateInzioFormatted()
{
    var today = new Date();
    today.setMonth(today.getMonth() - 1);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return  yyyy + "-" + mm + "-" + dd
}

// format from dd/MM/yyyy to YYY-MM-dd
function   FormatDate   (a )  {   
    var formatA = a.substring (6,10) + "/" + a.substring (3,5) + "/" +   a.substring (0,2)    ;
    return formatA ; 
};


// format from YYYY-MM-dd to dd/MM/yyyy 
function   FormatDateDDMMYYYY   (a )  {   
    if ( a === "" || a === null || a === undefined) return "";
 
    var formatA =   a.substring (8,10) + "/" +   a.substring (5,7)   + "/" +  a.substring (0,4) + " " +  a.substring (11) ;
    return formatA ; 
};



function getDateNowFormatted()
{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return  yyyy + "/" + mm + "/" + dd
}
  
 

function   CompareDate   (a, b)  {   
 
    var formatA = a.substring (6,10) + a.substring (3,5) +   a.substring (0,2)    ;
    var formatB = b.substring (6,10) + b.substring (3,5) +   b.substring (0,2)   ;
   
    
   return formatA >  formatB ? 1 : -1
    
  };