import './wasm_exec.js';

import React, { useEffect } from 'react';

declare global {
  export interface Window {
      Go: any;
      signShare: (keyShare: string, pubKey: string, payload: string) => string
  }
}

async function loadWasm(): Promise<void> {
  const goWasm = new window.Go();
  const result = await WebAssembly.instantiateStreaming(fetch('main.wasm'), goWasm.importObject);
  goWasm.run(result.instance);
}

export const MPCWrapper: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    loadWasm().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  } else {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
};