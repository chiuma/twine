<?php
 
require_once 'PHPMailer/class.phpmailer.php';

error_reporting(0);
 

function InvioMail  ($destinatario , $oggetto_mail, $testo_mail)
{
 

	// Creo i vari campi prendendoli dal forma della pagina precedente
	$nome_mittente = "Spago di terra";
 	$mail_mittente = "sendermail@cimicapp.com";
		
	 
	$messaggio = new \PHPMailer  ;
 
	$messaggio->CharSet = 'UTF-8';
	// utilizza la classe SMTP invece del comando mail() di php
	$messaggio->IsSMTP(); 
	$messaggio->Mailer   = "smtp"; // SMTP Method
	$messaggio->IsHTML(true);
	$messaggio->SMTPAuth   = true;     // abilita autenticazione SMTP
	$messaggio->SMTPKeepAlive = "true";
	$messaggio->Host  = "smtp.cimicapp.com";
	$messaggio->Username   = $mail_mittente;      // utente server SMTP autenticato
	$messaggio->Password   = "Gi@chiuma1971";    // password server SMTP autenticato
	$messaggio->Subject = $oggetto_mail;
	$messaggio->Sender= $mail_mittente; // indicates ReturnPath header
	$messaggio->From   = $mail_mittente;
	$messaggio->FromName = $nome_mittente;
	$messaggio->AddAddress($destinatario); 
	
	$messaggio->Body = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><HTML><body>".$testo_mail."</body></html>";
 
	if(!$messaggio->Send()) {		return false;	} 
	else {		return true;	}
 
 $messaggio->ClearAddresses();
	
}
 
?>
