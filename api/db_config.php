<?php

	 	define("HOST", "89.46.111.124");
	define("DB", "Sql1360838_5");
	define("DB_USER", "Sql1360838");
	define("DB_PASSWORD", "728rhdlcg4"); 
	
	/**

 	define("HOST", "127.0.0.1");
	define("DB", "twine");
	define("DB_USER", "root");
	define("DB_PASSWORD", "chiuma"); 
**/	
function DbGetNewId ($conn, $table_name, $nome_campo)
{
			
   	$sql = $sql = "SELECT  MAX(".$nome_campo.")   	 " .	" FROM  ".$table_name;
     
		$statement = $conn->prepare($sql);
		$statement->execute(); // no need to add `$sql` here, you can take that out
		$item_id = $statement->fetchColumn();
		return $item_id;
			
			
}	
	
?>
