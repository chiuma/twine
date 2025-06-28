import React, { useState }   from 'react';
 
 
import {     Box,   }    from   '@mui/material';
 
  
 
 
import {
  Scanner, 
  outline,
  boundingBox,
  centerText,
} from "@yudiel/react-qr-scanner";


export function CameraView(props: any) {
    
    // chrome://flags/#unsafely-treat-insecure-origin-as-secure
    const [tracker, setTracker] = useState<string | undefined>("centerText");
    const [pause, setPause] = useState(false);
  
 
  
    function getTracker() {
      switch (tracker) {
        case "outline":
          return outline;
        case "boundingBox":
          return boundingBox;
        case "centerText":
          return centerText;
        default:
          return undefined;
      }
    }
  
    const handleScan = async (data: string) => {
      setPause(true);
      try {
    
           props.onScan(data)
      } catch (error: unknown) {
        console.log(error); 
      } finally {
      setPause(false);
      }
    };
  
    return (
      <Box display="flex" flexDirection="column" alignItems="center" width="100%"
      justifyContent="space-between">
  
      <Box>

      </Box>

      <Box>
        <Scanner
          formats={[
            "qr_code",
            "micro_qr_code",
            "rm_qr_code",
            "maxi_code",
            "pdf417",
            "aztec",
            "data_matrix",
            "matrix_codes",
            "dx_film_edge",
            "databar",
            "databar_expanded",
            "codabar",
            "code_39",
            "code_93",
            "code_128",
            "ean_8",
            "ean_13",
            "itf",
            "linear_codes",
            "upc_a",
            "upc_e",
          ]} 
          onScan={(detectedCodes) => {
            handleScan(detectedCodes[0].rawValue);
          }}
          onError={(error) => {
        //    NotificationManager.error("Errore Camera", 'Articolo', 3000);  
            console.log(`onError: ${error}'`);
          }}
          styles={{ container: { height: "200px", width: "190px" } }}
          components={{ 
            onOff: false,
            torch: true,
            zoom: true,
            finder: true,
            tracker: getTracker(),
          }}
          allowMultiple={true}
          scanDelay={1000}
          
          paused={pause}
        />

          </Box>


<Box>


</Box>

      </Box>
    );
  }