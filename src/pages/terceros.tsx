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
        <b>conFIEL Extension</b> - Aplicación de explorador capaz de generar solicitudes de acceso
        para usuarios sin necesidad de guardar la FIEL.
      </Text>

      <List spacing={3} my={0} color="text">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="red.500" />
          Disponible para acceder el SAT
        </ListItem>
        <ListItem>
          <ListIcon as={TimeIcon} color="red.500" />
          Proximamente para acceder DIGIPris
        </ListItem>
      </List>

      <Button
        variant='outline'
        colorScheme='red'
        aria-label='Instalar extension de Chrome'
        fontSize='md'
        leftIcon={<AiOutlineChrome />}
      >Instalar extension de Chrome</Button>
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text fontSize='sm' fontFamily='mono'>XRPL Grant Wave 5</Text>
    </Footer>
    <CTA />
  </Container>
)

export default Index
