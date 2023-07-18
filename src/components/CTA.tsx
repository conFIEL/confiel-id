import { Link as ChakraLink, Button } from '@chakra-ui/react'

import { Container } from './Container'

export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom={0}
    width="full"
    maxWidth="3xl"
    py={3}
  >
    <Button
      as={ChakraLink}
      href="/#"
      variant="outline"
      colorScheme="red"
      rounded="button"
      flexGrow={1}
      mx={2}
      width="full"
    >
      Compartir Acceso
    </Button>
    <Button
      as={ChakraLink}
      href="/#"
      variant="solid"
      colorScheme="red"
      rounded="button"
      flexGrow={3}
      mx={2}
      width="full"
    >
      Subir FIEL
    </Button>
  </Container>
)
