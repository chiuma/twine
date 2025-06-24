<?php
// https://www.cimicapp.com/temp/twine/api/consegne_stampa.php

 error_reporting(0);
require_once "./JwtConfig.php";
require_once "./cors.php"; 
	$authCheck = JwtConfig::checkToken();
	if (  $authCheck["esito"] === "NOT_OK")
	{
	 	echo json_encode( $authCheck);  	die();
	}
	
?>
<!DOCTYPE html>
<html>
  <head>
  	<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>


    <style>
@page {
  size: A4;
  margin: 10;
}
@media print {
  html, body {
    width: 210mm;
    height: 287mm;
  }
 
}
  
    body {

        /* to centre page on screen*/
        margin-left: auto;
        margin-right: auto;
        font-family: 'Roboto'; font-size: 10pt;
    }
    
     .center {
			  margin-left: auto;
			  margin-right: auto;
			}

    .testata
    {
    	font-weight:bold;white-space: nowrap
    }
    
    .tabella
    {
			margin-bottom: 3%;
			width:94%;
		 border-collapse: collapse;
    }
    
    
    table, th, td {
  border: 1px solid black;
		}
 
			    		   table { page-break-inside:auto }
   tr    { page-break-inside:avoid; page-break-after:auto }
   
   
			    
    .cell_articolo
    {
    	width: 35%
    }
    
 
    .cell_qta
    {
    	width: 10%;
    	text-align:center
    }
    
    .cell_codice
    {
    	width: 25%,
    	
    }
    .cell_prezzo
    {
    	width: 20%,
    	
    }
    .cell_sconto    {
    	width: 10%,
    	
    }
    
    </style>
  </head>

  <body onload="  window.print() ">
  	

<?php

  
 

$sql = "";
$id_consegna  = $_GET["id_consegna"];
 

try
{
	include_once './db_config.php';		
			$json_elenco    = array();	
			
			$where = " WHERE 1=1 ";
			// id_cliente=1&id_articolo_base=-1&id_provenienza=-1&data_consegna_al=&data_consegna_dal=&data_ricezione_al=&data_ricezione_dal=&evaso=No&consegnato=No
			 

			
						
  	$sql = 
  	" SELECT  consegne.*, articoli_base.codice as articolo_base_codice "
 
  	. " , DATE_FORMAT(consegne.data_consegna_effettuata, '%d/%m/%Y') as data_consegna_effettuata_formatted   " 
		. "		,clienti.descrizione as cliente_descrizione   "
		. "		,consegne_dettaglio.id_consegna_dettaglio  , consegne_dettaglio.qta_evasa   "
		. "		,ordini_dettaglio.id_ordine_dettaglio , ordini_dettaglio.qta , ordini_dettaglio.prezzo as prezzo, consegne_dettaglio.sconto   "
		. "		,articoli_base.id_articolo_base , articoli_base.descrizione as articolo_base_descrizione    "
		. "		, colori.codice as colore_codice, colori.descrizione as colore_descrizione    "
		. " , ordini_dettaglio.id_colore_2, colori_2.codice as colore_codice_2, colori_2.descrizione as colore_descrizione_2   "
		. " , ordini_dettaglio.id_colore_3, colori_3.codice as colore_codice_3, colori_3.descrizione as colore_descrizione_3    "
		. "	FROM consegne  " 

		. "	INNER  JOIN clienti "
		. "	ON consegne.id_cliente = clienti.id_cliente  "
		
		
		. "	INNER  JOIN consegne_dettaglio "
		. "	ON consegne.id_consegna = consegne_dettaglio.id_consegna  "
		
		. "	INNER  JOIN ordini_dettaglio "
		. "	ON consegne_dettaglio.id_ordine_dettaglio  = ordini_dettaglio.id_ordine_dettaglio   "

 
 
		. "	INNER JOIN articoli_base "
		. "	ON ordini_dettaglio.id_articolo_base = articoli_base.id_articolo_base   "
  
  	. "	INNER JOIN colori  "
		. "	ON colori.id_colore  = ordini_dettaglio.id_colore    "
		
		. " LEFT JOIN colori as  colori_2  	ON colori_2.id_colore  = ordini_dettaglio.id_colore_2 "
		. " LEFT JOIN colori as  colori_3  	ON colori_3.id_colore  = ordini_dettaglio.id_colore_3 "
		
		. " WHERE   consegne.id_consegna =   " .$id_consegna  
		. "	ORDER BY articoli_base.codice, consegne.id_consegna desc, consegne_dettaglio.id_consegna_dettaglio    ";

	
     //echo $sql;die();

			$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
			$sth = $conn->prepare($sql);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		
		 	if (!$result)  throw new Exception('Errore sql');
		 
		 $importo_trasporto = $result[0]["importo_trasporto"];
		 $iva = $result[0]["iva"];
		 
?> 
				
			<table class="tabella center" border="0" cellpadding = "6" cellspacing = "4" 
				style="margin-top:1em; border: 0px ; margin-bottom:0; ">
				
 				<tr ><td colspan="3" style="border: 0px  ;vertical-align: bottom;text-align: center; font-weight:bold; font-size: 12pt;" >BUONO DI CONSEGNA</td></tr>

				<tr  >
	 				<td  class=""  style="border: 0px ;vertical-align: bottom;" >
	 					<b>Spett.le</b> 
	 					&nbsp;<?php echo $result[0]["cliente_descrizione"]?>
	 				</td>
			 		<td  class=""  style="border: 0px ;vertical-align: bottom;" >
	 					<b>CODICE</b>
	 					&nbsp;<?php echo 
	 					date("y",strtotime($result[0]["data_consegna_effettuata"])) ."/". str_pad($result[0]["progressivo"], 4, '0', STR_PAD_LEFT)
	 					 ?>
	 				</td>	 
			 
			 		<td  class=""  style="border: 0px solid black;vertical-align: bottom;text-align: right;" >
			 			<b>DATA</b>
	 					&nbsp;<?php echo $result[0]["data_consegna_effettuata_formatted"]?>

	 				</td>	 
 

			  </tr>	
			</table>
			
			
			<table class="tabella center" border="1" cellpadding = "4" cellspacing = "0">
 

				<tr  style="font-weight:bold; ">
					<td  class="cell_codice" style="vertical-align: bottom;" >Cod. art</td>   
	 				<td  class="cell_qta"  style="vertical-align: bottom;" >Pezzi</td>
			    <td  class="cell_articolo" style="vertical-align: bottom;" >Articolo</td>    
			   
			    <td  class="cell_prezzo"  style="vertical-align: bottom;text-align:right;" >Prezzo unitario</td>
			    <td  class="cell_sconto"  style="vertical-align: bottom;text-align:center;" >Sconto %</td>
			    <td  class="cell_prezzo"  style="vertical-align: bottom; text-align:right;" >Prezzo totale</td>
			  </tr>	
			  
<?php
$numRiga=0; $importo_totale =0;
			foreach ($result as $row)
			{
				
		 			
				 $numRiga ++;
				 
					$prezzo = number_format($row["prezzo"] , 2 , ",",".") ;
					
					$prezzo_scontato = ($row["prezzo"] * $row["qta"]) - 
					($row["prezzo"] * $row["qta"]  * $row["sconto"] / 100);
					$prezzo_totale = number_format(  $prezzo_scontato 	, 2 , ",",".") ;
															
					$importo_totale = $importo_totale + $prezzo_scontato;
			 
			 		$prezzo_evaso_scontato = ($row["prezzo"] * $row["qta_evasa"]) - 
					($row["prezzo"] * $row["qta_evasa"]  * $row["sconto"] / 100);
					 										
					$importo_evaso_totale = $importo_evaso_totale + $prezzo_evaso_scontato;
?>
				<tr>
			    
			    <td  class="cell_codice" style="vertical-align: bottom;" >
			    	<?php echo ($row["articolo_base_codice"]  ) ?>	
			    </td>   
	 				<td  class="cell_qta"  style="vertical-align: bottom;" >
	 					<?php echo ($row["qta"]) ?>	
	 				</td>
			    <td  class="cell_articolo" style="vertical-align: bottom;" >
			    	<?php echo ($row["articolo_base_descrizione"] . " / " . $row["colore_codice"] 
			    	. ($row["colore_codice_2"] != "" ? "+".$row["colore_codice_2"]: "")
			    	. ($row["colore_codice_3"] != "" ? "+".$row["colore_codice_3"]: "")
			    	) ?>
			    </td>    
			   
			    <td  class="cell_prezzo"  style="vertical-align: bottom; text-align:right;" >
			    	€&nbsp;<?php echo ($prezzo) ?>	
			    </td>
			    <td  class="cell_sconto"  style="vertical-align: bottom; text-align:center" >
			    <?php echo ($row["sconto"]) ?>		
			    </td>
			    <td  class="cell_prezzo"  style="vertical-align: bottom; text-align:right;" >
			    €&nbsp;<?php echo ($prezzo_totale) ?>		
			    </td>
			  </tr>	
			
<?php			
			 
		}   
		
		for ($i=0; $i < (5 - $numRiga); $i++) 
		 { 
?>
<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<?php			
			 
		}  
		
		$iva_evaso = ($importo_evaso_totale +  $importo_trasporto)*$iva/100 ;
			
		$importo_da_pagare = ($importo_totale +   $importo_trasporto) + $iva_evaso ;
																							
	//	$importo_da_pagare = ($importo_totale +   $importo_trasporto) + ( ($importo_totale +  $importo_trasporto)*$iva/100) ;
?> 

<tr><td colspan="6">&nbsp;</td></tr> 
<tr>
	<td colspan="5" style="font-weight:bold; text-align:right;">Totale</td>
	<td  style="text-align:right;">€&nbsp;<?php echo ( number_format(round($importo_totale,1)  , 2 , ",",".") ) ?></td>
</tr>

<tr>
	<td colspan="5" style="font-weight:bold; text-align:right;">Trasporto</td>
	<td style="text-align:right;">€&nbsp;<?php echo ( number_format($importo_trasporto , 2 , ",",".") ) ?></td>
</tr>



<tr>
	<td colspan="5" style="font-weight:bold; text-align:right;">Totale iva (<?php echo ( $iva) ?>%)</td>
	<td style="text-align:right;">€&nbsp;<?php echo (number_format(  $iva_evaso 	, 2 , ",",".") ) ?></td>
</tr>


<tr>
	<td colspan="5" style="font-weight:bold; text-align:right;">Totale da pagare</td>
	<td style="text-align:right;">€&nbsp;<?php echo ( number_format(round($importo_da_pagare,1) , 2 , ",",".") ) ?></td>
</tr>
</table>
			  </body>
</html>
<?php
	 
} 
catch (Exception $e) 
{

 echo "errore " . $e->getMessage();
  	
}	
	
?>
