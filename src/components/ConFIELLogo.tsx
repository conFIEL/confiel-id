import {
  Box,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Image from 'next/image';
import { Hero } from './Hero';

export const ConFIELLogo = () => {
  return (
    <ChakraLink href='/'>
      <Box mt="2rem" textAlign='center'>
        <Image style={{ margin: "auto" }} src="/conFIEL-logo.png" width='135' height='135' alt='conFIEL Logo' />
      </Box>
      <Hero title='conFIEL' />
    </ChakraLink>
  )
}