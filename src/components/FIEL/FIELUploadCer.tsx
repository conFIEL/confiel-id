import { useContext, useEffect, useRef, useState } from "react";
import { FIELStoreContext } from "./FIELContext";
import { Button, Input } from "@chakra-ui/react";

export const FIELUploadCer = () => {
  const context = useContext(FIELStoreContext);
  if (!context) throw new Error("FIELUploadCer must be used within a FIELStoreProvider");

  const hiddenFileInputCer = useRef(null);

  const [state, dispatch] = context;
  const { certificate } = state;

  const handleChangeCer = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      const certReader = new FileReader();
      certReader.onload = () => {
        dispatch({ type: 'SET_CER_FILE', payload: certReader.result });
      };
      certReader.readAsBinaryString(file);
    }
  };

  useEffect(() => {
    console.debug('(🪪,ℹ️) Certificate info,', certificate);
  }, [certificate])

  const handleClickCer = () => {
    hiddenFileInputCer.current.click();
  };
  return (
    certificate ? <p>Loaded certificate.</p> : <div>
      <Input
        type="file"
        ref={hiddenFileInputCer}
        onChange={handleChangeCer}
        accept=".cer"
        style={{ display: "none" }}
      />
      <Button
        onClick={handleClickCer}
        aria-label="file upload"
      >Upload .cer</Button>
    </div>
  )
}