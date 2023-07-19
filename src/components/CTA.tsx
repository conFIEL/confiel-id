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
      href="/personal"
      variant="outline"
      colorScheme="red"
      rounded="button"
      flexGrow={1}
      mx={2}
      width="full"
    >
      conFIEL Personal
    </Button>
    <Button
      as={ChakraLink}
      href="/terceros"
      variant="solid"
      colorScheme="red"
      rounded="button"
      flexGrow={3}
      mx={2}
      width="full"
    >
      conFIEL Terceros
    </Button>
  </Container>
)
