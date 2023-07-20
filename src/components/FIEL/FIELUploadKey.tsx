import { useContext, useEffect, useRef, useState } from "react";
import { FIELStoreContext } from "./FIELContext";
import { Button, Input } from "@chakra-ui/react";

export const FIELUploadKey = () => {
  const context = useContext(FIELStoreContext);
  if (!context) throw new Error("FIELUploadKey must be used within a FIELStoreProvider");

  const [state, dispatch] = context;
  const { privateKey } = state;

  const hiddenFileInputKey = useRef(null);

  const handleChangeKey = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      const keyReader = new FileReader();
      keyReader.onload = () => {
        dispatch({ type: 'SET_KEY_FILE', payload: keyReader.result });
      };
      keyReader.readAsBinaryString(file);
    }
  };

  useEffect(() => {
    console.debug('(🔑,ℹ️) Private key info,', privateKey);
  }, [privateKey])

  const handleClickKey = () => {
    hiddenFileInputKey.current.click();
  };

  return (
    privateKey ? <p>Llave cargada.</p> : <div>
      <Input
        type="file"
        ref={hiddenFileInputKey}
        onChange={handleChangeKey}
        accept=".key"
        style={{ display: "none" }}
      />
      <Button
        onClick={handleClickKey}
        aria-label="file upload"
      >Subir .key</Button>
    </div>
  )
}