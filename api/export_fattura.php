<?php
// http://127.0.0.1/react/twine/api/export_fattura.php?id_consegna=1

 error_reporting(0);
 require_once "./cors.php"; 
class DataException extends Exception
{
}


try
{
	include_once './db_config.php';		
	require_once "./JwtConfig.php";
	
	$authCheck = JwtConfig::checkToken();
	if (  $authCheck["esito"] === "NOT_OK")
	{
		throw new DataException('003');
	}
	
	
 	$json = file_get_contents('php://input'); 	

	$obj = json_decode($json, TRUE);

	$id_consegna =  $obj["id_consegna"] ; 	
	//$id_consegna =  $_GET["id_consegna"] ; 	
	
	//$id_consegna =  5;
	$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	
	 	$sql = 
  	" SELECT clienti.descrizione as cliente_descrizione,  clienti.piva, clienti.codfiscale  , clienti.indirizzo, clienti.cap , clienti.comune,  clienti.provincia "
   	. "		,clienti.descrizione as cliente_descrizione   "
   	. " , DATE_FORMAT(consegne.data_consegna_effettuata, '%Y-%m-%d') as data_consegna_effettuata_formatted   " 
		. " , consegne.iva , consegne.colli, consegne.importo_trasporto "
		. "		, SUM((ordini_dettaglio.prezzo * consegne_dettaglio.qta_evasa) -(ordini_dettaglio.prezzo * consegne_dettaglio.qta_evasa*consegne_dettaglio.sconto/100)) + consegne.importo_trasporto		as importo_totale   "
		. "	FROM consegne  " 

		. "	INNER  JOIN clienti "
		. "	ON consegne.id_cliente = clienti.id_cliente  "
		
		. "	INNER  JOIN consegne_dettaglio "
		. "	ON consegne_dettaglio.id_consegna = consegne.id_consegna  "
	 
	 	. "	INNER  JOIN ordini_dettaglio "
		. "	ON consegne_dettaglio.id_ordine_dettaglio  = ordini_dettaglio.id_ordine_dettaglio   "
		. " WHERE consegne_dettaglio.qta_evasa > 0  and   consegne.id_consegna =   " .$id_consegna   
		. " GROUP BY consegne.importo_trasporto , clienti.descrizione, consegne.iva, clienti.piva, clienti.codfiscale  , clienti.indirizzo, clienti.cap , clienti.comune,  clienti.provincia "
		. " ,clienti.descrizione " ;



 //echo $sql ;   
	
	$sth = $conn->prepare($sql);
 
	$sth->execute();
 
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);		
	if (!$result)  throw new Exception('Errore sql');
	$row = $result[0];
	$iva = $row["iva"];
	$importo_trasporto = $row["importo_trasporto"]; 
	$piva = $row["piva"];
	$colli = $row["colli"] == 0 ? 1 : $row["colli"]; 
	$codfiscale = $row["codfiscale"];
	$indirizzo = $row["indirizzo"];
	$cap = $row["cap"];
	$comune = $row["comune"];
	$provincia = strtoupper ($row["provincia"]);
	$data_consegna_effettuata = $row["data_consegna_effettuata_formatted"];
	
	$importo_totale	=  $row["importo_totale"] + ($row["importo_totale"]*$row["iva"]/100);
	
	
	$cliente_descrizione =   $row["cliente_descrizione"];
 	if ($codfiscale == "" || $piva== "" )
 	{
	 	 throw new DataException('002');
	}
	 
//	header('Content-type: text/xml');
//  	header('Content-Disposition: attachment; filename="export_fattura.xml"');

echo '<?xml version="1.0" encoding="utf-8"?>'
?>

<q1:FatturaElettronica versione="FPR12" xmlns:q1="http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2">
  <FatturaElettronicaHeader>
    <DatiTrasmissione>
      <IdTrasmittente>
        <IdPaese>IT</IdPaese>
        <IdCodice>01879020517</IdCodice>
      </IdTrasmittente>
      <ProgressivoInvio>225</ProgressivoInvio>
      <FormatoTrasmissione>FPR12</FormatoTrasmissione>
      <CodiceDestinatario>0000000</CodiceDestinatario>
    </DatiTrasmissione>
    <CedentePrestatore>
      <DatiAnagrafici>
        <IdFiscaleIVA>
          <IdPaese>IT</IdPaese>
          <IdCodice>07760311212</IdCodice>
        </IdFiscaleIVA>
        <CodiceFiscale>07760311212</CodiceFiscale>
        <Anagrafica>
          <Denominazione>TWINE S.R.L.</Denominazione>
        </Anagrafica>
        <RegimeFiscale>RF01</RegimeFiscale>
      </DatiAnagrafici>
      <Sede>
        <Indirizzo>Via Vincenzo d'Ajello 12</Indirizzo>
        <NumeroCivico>12b</NumeroCivico>
        <CAP>80043</CAP>
        <Comune>Castellammare di Stabia</Comune>
        <Provincia>NA</Provincia>
        <Nazione>IT</Nazione>
      </Sede>
      <Contatti>
        <Telefono>0810682371</Telefono>
        <Email>spagoditerra@gmail.com</Email>
      </Contatti>
    </CedentePrestatore>
    <CessionarioCommittente>
      <DatiAnagrafici>
        <IdFiscaleIVA>
          <IdPaese>IT</IdPaese>
          <IdCodice><?php echo ($piva ) ?></IdCodice>
        </IdFiscaleIVA>
        <CodiceFiscale><?php echo ($codfiscale ) ?></CodiceFiscale>
        <Anagrafica>
          <Denominazione><?php echo ($cliente_descrizione ) ?></Denominazione>
        </Anagrafica>
      </DatiAnagrafici>
      <Sede>
        <Indirizzo><?php echo ($indirizzo ) ?></Indirizzo>
        <CAP><?php echo ($cap ) ?></CAP>
        <Comune><?php echo ($comune ) ?></Comune>
        <Provincia><?php echo ($provincia ) ?></Provincia>
        <Nazione>IT</Nazione>
      </Sede>
    </CessionarioCommittente>
  </FatturaElettronicaHeader>
  <FatturaElettronicaBody>
    <DatiGenerali>
      <DatiGeneraliDocumento>
        <TipoDocumento>TD01</TipoDocumento>
        <Divisa>EUR</Divisa>
        <Data><?php echo ($data_consegna_effettuata ) ?></Data>
        <Numero>FPR 290/21</Numero>
        <ImportoTotaleDocumento><?php echo (number_format($importo_totale , 2 , ".","")) ?></ImportoTotaleDocumento>
      </DatiGeneraliDocumento>
<?php 
	if ($importo_trasporto > 0)
	{
?>
      <DatiTrasporto>
        <DatiAnagraficiVettore>
          <IdFiscaleIVA>
            <IdPaese>IT</IdPaese>
            <IdCodice>03284320615</IdCodice>
          </IdFiscaleIVA>
          <Anagrafica>
            <Denominazione>City express</Denominazione>
          </Anagrafica>
        </DatiAnagraficiVettore>
        <CausaleTrasporto>Vendita</CausaleTrasporto>
        <NumeroColli><?php echo ($colli ) ?></NumeroColli>
        <DataOraRitiro><?php echo ($data_consegna_effettuata ) ?>T13:00:00</DataOraRitiro>
      </DatiTrasporto>
<?php 
  }
  else
  {
?>     
			<DatiTrasporto>
        <MezzoTrasporto>Destinatario</MezzoTrasporto>
        <CausaleTrasporto>Vendita</CausaleTrasporto>
        <NumeroColli><?php echo ($colli ) ?></NumeroColli>
        <DataOraRitiro><?php echo ($data_consegna_effettuata ) ?>T13:00:00</DataOraRitiro>
      </DatiTrasporto>
<?php 
  }
?>      
    </DatiGenerali>
    <DatiBeniServizi>    	
<?php 
			$numRiga = 1;
		$sql = 
  	" SELECT articoli_base.descrizione , articoli_base.codice,  ordini_dettaglio.prezzo ,  consegne_dettaglio.sconto  "
  	. " , SUM(consegne_dettaglio.qta_evasa ) as qta " 
		. "	FROM ordini_dettaglio  " 
  
		. "	INNER  JOIN consegne_dettaglio "
		. "	ON consegne_dettaglio.id_ordine_dettaglio = ordini_dettaglio.id_ordine_dettaglio  "
	 
	 	. "	INNER  JOIN articoli_base "
		. "	ON articoli_base.id_articolo_base   = ordini_dettaglio.id_articolo_base    "
		
		
		. " WHERE consegne_dettaglio.qta_evasa > 0 and consegne_dettaglio.id_consegna =   " .$id_consegna   
		. " GROUP BY articoli_base.codice, articoli_base.descrizione , ordini_dettaglio.prezzo ,  consegne_dettaglio.sconto" ;
 
 
 
			$sth = $conn->prepare($sql);
			$sth->execute();
		 
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		 
		 
			$importo_imponibile = $importo_trasporto  ;
				
			foreach ($result as $rowDettaglio)
			{
				$prezzo_scontato = ($rowDettaglio["qta"]*$rowDettaglio["prezzo"]) - 
												(($rowDettaglio["qta"]*$rowDettaglio["prezzo"])*$rowDettaglio["sconto"]/100);

				$importo_imponibile = $importo_imponibile  + $prezzo_scontato;
?>
      <DettaglioLinee>
      	<NumeroLinea><?php echo ($numRiga ) ?></NumeroLinea>
      	<CodiceArticolo>
      		<CodiceTipo>Codice</CodiceTipo>
      		<CodiceValore><?php echo ($rowDettaglio["codice"] ) ?></CodiceValore>
      	</CodiceArticolo>
        
        <Descrizione><?php echo ($rowDettaglio["descrizione"] ) ?></Descrizione>
        <Quantita><?php echo (number_format($rowDettaglio["qta"] , 2 , ".","")  ) ?></Quantita>
        <UnitaMisura>PZ</UnitaMisura>
        <PrezzoUnitario><?php echo (number_format($rowDettaglio["prezzo"] , 2 , ".","")  ) ?></PrezzoUnitario>
<?php 
	if ($rowDettaglio["sconto"] > 0)
	{
?>        
        <ScontoMaggiorazione>
          <Tipo>SC</Tipo>
          <Percentuale><?php echo (number_format($rowDettaglio["sconto"] , 2 , ".","")  ) ?></Percentuale>
        </ScontoMaggiorazione>
<?php 			 
		}
?>        
        <PrezzoTotale><?php echo (number_format($prezzo_scontato , 3 , ".","")  ) ?></PrezzoTotale>
        <AliquotaIVA><?php echo (number_format($iva , 2 , ".","")  ) ?></AliquotaIVA>
      </DettaglioLinee>      
<?php 
			$numRiga++;
		}
?>
<?php 
	if ($importo_trasporto > 0)
	{
?>
      <DettaglioLinee>
        <NumeroLinea><?php echo ($numRiga ) ?></NumeroLinea>
        <Descrizione>Spese spedizione</Descrizione>
        <Quantita>1.00</Quantita>
        <PrezzoUnitario><?php echo (number_format($importo_trasporto  , 2 , ".","")  ) ?></PrezzoUnitario>
        <PrezzoTotale><?php echo (number_format($importo_trasporto  , 2 , ".","")  ) ?></PrezzoTotale>
        <AliquotaIVA><?php echo (number_format($iva , 2 , ".","")  ) ?></AliquotaIVA>
      </DettaglioLinee>   
<?php 
	}
?>     
      <DatiRiepilogo>
        <AliquotaIVA><?php echo (number_format($iva , 2 , ".","")  ) ?></AliquotaIVA>
        <ImponibileImporto><?php echo (number_format($importo_imponibile , 2 , ".","")  ) ?></ImponibileImporto>
        <Imposta><?php echo (number_format($importo_imponibile*$iva/100 , 2 , ".","")  ) ?></Imposta>
        <EsigibilitaIVA>I</EsigibilitaIVA>
      </DatiRiepilogo>
    </DatiBeniServizi>
    <DatiPagamento>
      <CondizioniPagamento>TP02</CondizioniPagamento>
      <DettaglioPagamento>
        <ModalitaPagamento>MP01</ModalitaPagamento>
        <DataScadenzaPagamento><?php echo ($data_consegna_effettuata ) ?></DataScadenzaPagamento>
        <ImportoPagamento><?php echo (number_format($importo_totale , 2 , ".","")  ) ?></ImportoPagamento>
      </DettaglioPagamento>
    </DatiPagamento>
  </FatturaElettronicaBody>
</q1:FatturaElettronica>

<?php
	die();

} 
catch (DataException $e) 
{
header('Content-Type:text/html; charset=UTF-8');

 echo  ( $e->getMessage()  ); 	
  	
}	

catch (Exception $e) 
{
header('Content-Type:text/html; charset=UTF-8');

 echo  ( "001"  ); 	
  	
}	
	
?>