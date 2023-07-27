import { useRouter } from "next/router";
import { Box, Code, Flex, Text } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { PersonalIntroContent } from "../components/PersonalIntroContent";
import { useEffect, useState } from "react";
import FIEL from "../components/FIEL/FIEL";
import { FIELMPC } from "../components/FIELMPC/FIELMPC";

type ClientInfo = {
  url: string;
  browser: string;
};

const Personal = () => {
  const router = useRouter();
  const { query } = router;
  const token = query?.token && `${query.token}`;
  const info = query?.info && `${query.info}`;
  const [canLoadViaPage, setCanLoadViaPage] = useState(false);
  const [hasTokenForSigning, setHasTokenForSigning] = useState(false);
  const [requestInfo, setRequestInfo] = useState<ClientInfo>();

  useEffect(() => {
    if (token) {
      setCanLoadViaPage(true);
      setHasTokenForSigning(true);
    }
    if (info) {
      const parsedInfo = atob(info);
      const [url, browser] = parsedInfo.split("::");
      setRequestInfo({ url, browser });
    }
  }, [query]);

  return (
    <Container py="2rem">
      <Logo />
      <Main>
        {hasTokenForSigning && (
          <Box borderWidth='2px' borderColor='red.500' p="3">
            <Text fontWeight={"bold"}>
              Se te solicita acceso con tu e.FIRMA.
            </Text>
            {requestInfo && (
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                mt="2"
                flexDir={"column"}
              >
                <Text fontSize={'xs'}>La solicitud incluye la siguiente información:</Text>
                {Object.keys(requestInfo).map((key) => (
                  <Flex key={key} alignItems={"center"} my="2">
                    <Text fontSize={'xs'} width={'60px'} mr="2" fontFamily={"mono"} textTransform={'capitalize'} textAlign={'right'}>
                      {key}
                    </Text>
                    <Code style={{
                      maxWidth: '240px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      textAlign: 'left'
                    }} px="2" py="1" fontSize={'xs'}>
                      {requestInfo[key]}
                    </Code>
                  </Flex>
                ))}
              </Flex>
            )}
          </Box>
        )}
        {canLoadViaPage ?
        <>
          <FIEL />
          <FIELMPC />
        </> : <PersonalIntroContent />}
        <Text
          onClick={() => setCanLoadViaPage(!canLoadViaPage)}
          fontSize={"sm"}
          cursor={"pointer"}
          color="red.500"
          textDecoration={"underline"}
        >
          {canLoadViaPage
            ? "regresar a la pagina de instalación"
            : "o utiliza la página web para preparar conFIEL ID"}
        </Text>
      </Main>

      <DarkModeSwitch />
      <Footer>
        <Text fontSize="sm" fontFamily="mono">
          XRPL Grant Wave 5
        </Text>
      </Footer>
    </Container>
  );
};

export default Personal;
