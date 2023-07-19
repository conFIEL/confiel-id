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
import { CheckCircleIcon } from '@chakra-ui/icons'
import { IoLogoPwa } from 'react-icons/io5'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import Image from 'next/image'

const Index = () => (
  <Container py="2rem">
    <ChakraLink href='/'>
      <Box mt="2rem">
        <Image src="/conFIEL-logo.png" width='135' height='135' alt='conFIEL Logo' />
      </Box>
      <Hero title='conFIEL' />
    </ChakraLink>
    <Main>
      <Text color="text">
        <b>conFIEL ID</b> - Aplicación web optimizada para celular para cargar tu FIEL (e.FIRMA)
        y guardarla de forma segura en tu celular.
      </Text>

      <List spacing={3} my={0} color="text">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="red.500" />
          Tu e.FIRMA permanece en tu celular.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="red.500" />
          Otorga el acceso a personas de confianza.
        </ListItem>
      </List>

      <Button
        variant='outline'
        colorScheme='red'
        aria-label='Instalar extension de Chrome'
        fontSize='md'
        leftIcon={<IoLogoPwa />}
      >Instalar conFIEL ID</Button>
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text fontSize='sm' fontFamily='mono'>XRPL Grant Wave 5</Text>
    </Footer>
    <CTA />
  </Container>
)

export default Index
