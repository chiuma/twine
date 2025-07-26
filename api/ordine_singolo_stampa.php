<?php
// https://www.cimicapp.com/temp/twine/api/ordini_stampa.php
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
    height: 297mm;
  }
 
}



   table, th, td {
  border: 1px solid black;
		}
		
	 table { page-break-inside:auto }
   tr    { page-break-inside:avoid; page-break-after:avoid }
   
   
   
    body {

        /* to centre page on screen*/
        margin-left: auto;
        margin-right: auto;
        font-family: 'Roboto';font-size: 18px;
        
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
			width:98%;
    }
    
    .cell_codice
    {
    	width: 10%,
    	
    }
    
    .cell_articolo
    {
    	width: 35%
    }
    
     .cell_colore
    {
    	width: 25%
    }
        
    .cell_qta
    {
    	width: 10%;
    	text-align:center
    }
    
    .cell_prezzo
    {
    	width: 10%;
    	text-align:center
    }
    
 
    
    
    </style>
  </head>

  <body onload=" window.print()  ">
  	

<?php
//window.print()

  
 

$sql = "";



try
{
	include_once './db_config.php';		
			$json_elenco    = array();	
			$conPrezzo = $_GET["conPrezzo"];
			$where = " WHERE ordini.id_ordine = " .($_GET["id_ordine"]);
			  
 
			// TEST  $where =   " WHERE ordini_dettaglio.id_ordine_dettaglio = 11 ";
						
  		$sql = 
   	" SELECT     "
		. "		 ordini_dettaglio.id_ordine_dettaglio, ordini_dettaglio.id_articolo_base, ordini_dettaglio.qta,  ordini_dettaglio.prezzo,  "
		. "		ordini_dettaglio.id_colore, ordini.id_cliente,  ordini.id_provenienza , "
		
		. " ordini_dettaglio.id_colore_2, colori_2.codice as colore_codice_2, colori_2.descrizione as colore_descrizione_2 , "
		. " ordini_dettaglio.id_colore_3, colori_3.codice as colore_codice_3, colori_3.descrizione as colore_descrizione_3 , "
		
		. "		DATE_FORMAT(ordini.data_consegna, '%d/%m/%Y') as data_consegna_formatted,   "
		. "		DATE_FORMAT(ordini.data_ricezione, '%d/%m/%Y') as data_ricezione_formatted,   "
		. "		ordini_dettaglio.evaso,     "
		. "		articoli_base.id_articolo_base, articoli_base.codice, articoli_base.descrizione,  "
		. "		colori.codice as colore_codice, colori.descrizione as colore_descrizione , "
		. "		clienti.descrizione as cliente_descrizione   "
		. "	FROM ordini_dettaglio  "
				
		. "	INNER  JOIN ordini "
		. "	ON ordini_dettaglio.id_ordine = ordini.id_ordine  "

		. "	INNER  JOIN clienti "
		. "	ON ordini.id_cliente = clienti.id_cliente  "
 
		. "	INNER JOIN articoli_base "
		. "	ON ordini_dettaglio.id_articolo_base = articoli_base.id_articolo_base   "
  
  	. "	INNER JOIN colori  "
		. "	ON colori.id_colore  = ordini_dettaglio.id_colore    "
		
		. " LEFT JOIN colori as  colori_2  	ON colori_2.id_colore  = ordini_dettaglio.id_colore_2 "
		. " LEFT JOIN colori as  colori_3  	ON colori_3.id_colore  = ordini_dettaglio.id_colore_3 "
		
		. "	LEFT JOIN provenienze  "
		. "	ON provenienze.id_provenienza  = ordini.id_provenienza    " 
		
		. "	LEFT JOIN consegne_dettaglio  "
		. "	ON consegne_dettaglio.id_ordine_dettaglio  = ordini_dettaglio.id_ordine_dettaglio    "
				
		. $where	
		. "	ORDER BY  clienti.descrizione, ordini.data_consegna , articoli_base.codice, colori.codice   ";

     // echo $sql; die();

			$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
			$sth = $conn->prepare($sql);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		
			$prec_id_cliente = "-1";
		 
			$importo_totale = 0 ;
			foreach ($result as $row)
			{
				
					$prezzo = number_format($row["prezzo"] , 2 , ",",".") ;
					
					 
					$prezzo_totale = number_format( 
													 	  $row["prezzo"]*$row["qta"]
															, 2 , ",",".") ;
															
					$importo_totale = $importo_totale + ($row["prezzo"]*$row["qta"]);
				
				
				if ( $prec_id_cliente !=   $row["id_cliente"] )
				{
					$prec_id_cliente = $row["id_cliente"];
			 
					
?> 
				<div style="page-break-inside: avoid;"><br/>
				<table class="tabella center" border="1" cellpadding = "4" cellspacing = "0" style="margin-top:1em;" >
				  <tr >
				    <td align="left" colspan="6" style="font-weight:bold;">
				    	CLIENTE
				    	&nbsp;
				    	<span style="font-weight:normal;">
				    	<?php echo ($row["cliente_descrizione"]) ?>
				    	</span>
				    	&nbsp;&nbsp;
				    	DATA RICHIESTA
				    	&nbsp;
				    	<span style="font-weight:normal;">
				    	<?php echo ($row["data_ricezione_formatted"]) ?>
				    	</span>
				    	</td>
				  </tr>	

				<tr  style="font-weight:bold; ">
			 
					<td   class="cell_codice"  style="vertical-align: bottom;" >CODICE</td>
			    <td  class="cell_articolo" style="vertical-align: bottom;" >ARTICOLO</td>    
			    <td   class="cell_colore"  style="vertical-align: bottom;" >COLORE</td>
			    <td  class="cell_qta"  style="vertical-align: bottom;" >QTA</td>
			    <?php if ($conPrezzo == "si" )
			    {
			    ?>
			    <td  class="cell_prezzo"  style="vertical-align: bottom;" >PREZZO</td>
			    <td  class="cell_prezzo"  style="vertical-align: bottom;" >TOTALE</td>
			    <?php
			    }
			    ?>
			  </tr>	
			  
<?php
				}
			 
?>
				<tr>
			 
					<td   class="cell_codice"   ><?php echo ($row["codice"] . "-". $row["colore_codice"]) ?></td>
			    <td class="cell_articolo"  ><?php echo ($row["descrizione"] ) ?></td>    
			    <td  class="cell_colore"  ><?php echo (
			    	$row["colore_descrizione"] 
			    	. ($row["colore_descrizione_2"] != "" ? "+". $row["colore_descrizione_2"] : "")
			    	. ($row["colore_descrizione_3"] != "" ? "+". $row["colore_descrizione_3"] : "")
			    	
			    	)
			    	 ?></td>
			    <td  class="cell_qta"  ><?php echo ($row["qta"]) ?></td>
			    <?php if ($conPrezzo == "si" )
			    {
			    ?>
			    <td  class="cell_prezzo"  >€&nbsp;<?php echo ($prezzo) ?></td>
			    <td  class="cell_prezzo"  >€&nbsp;<?php echo ($prezzo_totale ) ?></td>
			    <?php
			    }
			    ?>
			  </tr>	
			
<?php			
			 
		}   
		
?>
			    <?php if ($conPrezzo == "si" )
			    {
			    ?>
				  <tr >
				    <td   colspan="5"  >  &nbsp; 	</td>
				    <td  class="cell_prezzo"  >€&nbsp;<?php echo (  number_format($importo_totale , 2 , ",",".") ) ?></td>
				  </tr>	
				  			
<?php			
			 
		}   
		
?>
				   </table>
				   
				   </div>
 <br>
			  </body>
</html>
<?php
	 
} 
catch (Exception $e) 
{

 echo  ("errore ".$e->getMessage()  ); 	
  	
}	
	
?>
