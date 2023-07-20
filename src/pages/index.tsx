import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Box,
  Button,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { AiOutlineChrome } from 'react-icons/ai'

import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import { Logo } from '../components/Logo'

const Index = () => (
  <Container py="2rem">
    <Logo />
    <Main>
      <Text color="text">
        <b>Para personas</b> - Administra tu FIEL de forma segura y permite el acceso a portales de gobierno
        (e.g. SAT) a terceros sin necesidad de compartir tu FIEL.
      </Text>
      <Text color="text">
        <b>Para terceros</b> - Solicita acceso a tus clientes a sus portales de gobierno sin necesidad de guardar la FIEL de contribuyentes
        o empresa.
      </Text>
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text fontSize='sm' fontFamily='mono'>XRPL Grant Wave 5</Text>
    </Footer>
    <CTA />
  </Container>
)

export default Index
