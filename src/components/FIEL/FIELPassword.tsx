import { useContext } from "react";
import { FIELStoreContext } from "./FIELContext";
import { Input } from "@chakra-ui/react";

export const FIELPassword = () => {
  const context = useContext(FIELStoreContext);
  if (!context) throw new Error("FIELPassword must be used within a FIELStoreProvider");

  const [state, dispatch] = context;
  const { password } = state;
  const handleChange = (e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
  return (
    <Input type="password" placeholder="Contraseña FIEL" onChange={handleChange} value={password} />
  );
}