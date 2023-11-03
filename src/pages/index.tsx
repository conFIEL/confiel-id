import { Text, Flex, SimpleGrid } from "@chakra-ui/react";
import { DeleteIcon, SettingsIcon } from "@chakra-ui/icons";

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { FIELStatus } from "../components/FIEL/FIELStatus";
import { loadSystemDemoFIEL } from "../lib/fiel-mock";
import { useFIELStore } from "../stores/FIEL";

const Index = () => {
  const credential = useFIELStore((state) => state.credential);
  const loadCredential = useFIELStore((state) => state.loadCredential);
  const resetCredential = useFIELStore((state) => state.resetCredential);
  const loadDemoFIELHandler = async () => {
    const fiel = await loadSystemDemoFIEL();
    loadCredential(fiel);
  };
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
        <SimpleGrid columns={1}>
          {!credential ? (
            <Flex
              gap="2"
              justify={"center"}
              align={"center"}
              cursor={"pointer"}
            >
              <SettingsIcon boxSize={3} />
              <Text fontSize={"xs"} onClick={() => loadDemoFIELHandler()}>
                {" "}
                Load demo FIEL into system.
              </Text>
            </Flex>
          ) : (
            <Flex
              gap="2"
              justify={"center"}
              align={"center"}
              cursor={"pointer"}
            >
              <DeleteIcon boxSize={3} />
              <Text fontSize={"xs"} onClick={() => resetCredential()}>
                {" "}
                Remove demo FIEL from system.
              </Text>
            </Flex>
          )}
        </SimpleGrid>
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
