import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Box,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import Image from 'next/image'

const Index = () => (
  <Container py="2rem">
    <Box mt="2rem">
      <Image src="/conFIEL-logo.png" width='135' height='135' alt='conFIEL Logo' />
    </Box>
    <Hero title='conFIEL' />
    <Main>
      <Text color="text">
        Administra tu FIEL de forma segura y permite a otras personas hacer uso de
        ella de forma temporal.
      </Text>

      <List spacing={3} my={0} color="text">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="red.500" />
          Tu FIEL se instala en tu dispositivo
          </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="red.500" />
          Comparte acceso sin enviar tu FIEL
          </ListItem>
      </List>
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text fontSize='sm' fontFamily='mono'>XRPL Grant Wave 5</Text>
    </Footer>
    <CTA />
  </Container>
)

export default Index
