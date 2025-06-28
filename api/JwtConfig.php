<?php

use \Firebase\JWT\JWT;
require_once "./lib/JWT.php";


 

function getTokenFromHeader()
{	
	$token = "";
	foreach($_SERVER as $name => $value) {
    if($name != 'HTTP_MOD_REWRITE' && (substr($name, 0, 5) == 'HTTP_' || $name == 'CONTENT_LENGTH' || $name == 'CONTENT_TYPE')) 
    {
        $name = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', str_replace('HTTP_', '', $name)))));
       
        if ($name == "Authorization")
        	$token = $value;
       
    }
   } 
    return $token;
}


class JwtConfig
{
	static $KEY    = '_TWINE@CHIUma@SEC_';
	static $DOMAIN    = 'https://localhost';
	static $tokenDuration = 18000; // in secondi
	
	public static function makeToken($data)
	{
			
			$issuedAt   = time();
			$notBefore  = $issuedAt + 0;             //Adding 10 seconds
			$expire     = $notBefore + ( JwtConfig::$tokenDuration);            // Adding 60 seconds
		 
			$payload = array(
		    "iss" => JwtConfig::$DOMAIN,
		    "aud" => JwtConfig::$DOMAIN,
		    "iat" => $issuedAt,
		    "nbf" => $notBefore ,
		    "exp"  => $expire,  
		    "data" => ($data === null ? "" : $data) );
		    
			return JWT::encode($payload, JwtConfig::$KEY);    
 
	}
	
	public static function checkToken()
	{
		try
		{
			$header = getTokenFromHeader();
// $header = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0IiwiYXVkIjoiaHR0cHM6XC9cL2xvY2FsaG9zdCIsImlhdCI6MTYyMjgyNTMxNiwibmJmIjoxNjIyODI1MzE2LCJleHAiOjE2MjI4MjUzNDYsImRhdGEiOiIifQ.slJK3JmrZNV-ZInlZz0QsuDTlrlS9ijV7egxDD5A6FQ";
			try
	 	 	{
	 	 		
				$decoded = JWT::decode ($header, JwtConfig::$KEY,  array('HS256')) ; 
				$json_response    =  array('esito' => 'OK', 'decoded' => $decoded);	
			}
			catch (\Firebase\JWT\ExpiredException $e) 
			{ 
				 
		    list($header, $payload, $signature) = explode(".", $header);
 
		    $payload = json_decode(base64_decode($payload));
 
  
			  if ( time() - $payload->exp < JwtConfig::$tokenDuration    )
			  {
			  					$json_response    =  array('esito' => 'NOT_OK', 'err_code' => "-001"  ,	
									'token_refreshed' => JwtConfig::makeToken( $payload ), 
									'msg' => $e->getMessage());	
			
			  }
			  else
			  {
			  					$json_response    =  array('esito' => 'NOT_OK', 'err_code' => "-002"  ,	 
									'msg' => $e->getMessage());	
			
			  }

 
			}
			
			catch (Exception $e) 
			{ 
				$json_response    =  array( 'esito' => 'NOT_OK', 	'err_code' => "-002"  , 'msg' => 'Invalid token'   );	
 
			}	
			
			return $json_response ;
		}
		catch (Exception $e) 
		{	 
		
		 	$json_response    =  array( 			         						         		  	  					         							   					         		
					'esito' => 'NOT_OK',			   		
					'err_code' => "001"  ,	
					 	 
					'msg' => $e->getMessage() ,	
			 		);	
		 
			 
		  return $json_response;
		  	
		}	  		
		
	}
	
	  public static function decodeDataToken( )
    {
        try {
        	$token = getTokenFromHeader();
        		
            $decoded = JWT::decode($token, JwtConfig::$KEY, array('HS256'));
             
            return $decoded->data;
        } catch (Exception $e) {
            return null;
        }
    }	 
}

?>
