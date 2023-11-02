import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon, SettingsIcon } from "@chakra-ui/icons";
import { AiOutlineChrome } from "react-icons/ai";

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { FIELStatus } from "../components/FIEL/FIELStatus";
import { loadSystemDemoFIEL } from "../lib/fiel-mock";

const Index = () => {
  const loadDemoFIELHandler = async () => {
    const fiel = await loadSystemDemoFIEL();
    console.log("FIEL", fiel);
  }
  return (
    <Container py="2rem">
      <Logo />
      <Main>
        <Text color="text">
          <b>Para personas</b> - Administra tu FIEL de forma segura y permite el
          acceso a portales de gobierno (e.g. SAT) a terceros sin necesidad de
          compartir tu FIEL.
        </Text>
        <Text color="text">
          <b>Para terceros</b> - Solicita acceso a tus clientes a sus portales
          de gobierno sin necesidad de guardar la FIEL de contribuyentes o
          empresa.
        </Text>
        <Flex gap="2" justify={"center"} align={"center"} cursor={"pointer"}>
          <SettingsIcon boxSize={4} />
          <Text fontSize={"md"} onClick={() => loadDemoFIELHandler()}> Load demo FIEL into system.</Text>
        </Flex>
      </Main>
      <FIELStatus />
      <DarkModeSwitch />
      <Footer>
        <Text fontSize="sm" fontFamily="mono">
          XRPL Grant Wave 5
        </Text>
      </Footer>
      <CTA />
    </Container>
  );
};

export default Index;
