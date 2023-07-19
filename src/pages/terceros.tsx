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
import { CheckCircleIcon, TimeIcon } from '@chakra-ui/icons'
import { AiOutlineChrome } from 'react-icons/ai'

import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import { ConFIELLogo } from '../components/conFIELLogo'
import { TercerosIntroContent } from '../components/TercerosIntroContent'

const Index = () => (
  <Container py="2rem">
    <ConFIELLogo />
    <Main>
      <TercerosIntroContent />
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text fontSize='sm' fontFamily='mono'>XRPL Grant Wave 5</Text>
    </Footer>
    <CTA />
  </Container>
)

export default Index
