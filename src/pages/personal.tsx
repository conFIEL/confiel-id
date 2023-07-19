import { Text } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import { ConFIELLogo } from '../components/conFIELLogo'
import { PersonalIntroContent } from '../components/PersonalIntroContent'
import { useState } from 'react'

const Personal = () => {
  const [canLoadViaPage, setCanLoadViaPage] = useState(false);
  return (
    <Container py="2rem">
      <ConFIELLogo />
      <Main>
        {canLoadViaPage ? <>Load FIEL here</> : <PersonalIntroContent />}
        <Text onClick={() => setCanLoadViaPage(!canLoadViaPage)} fontSize={'sm'} cursor={'pointer'} color="red.500" textDecoration={'underline'}>o utiliza la página web para preparar conFIEL ID</Text>
      </Main>

      <DarkModeSwitch />
      <Footer>
        <Text fontSize='sm' fontFamily='mono'>XRPL Grant Wave 5</Text>
      </Footer>
      <CTA />
    </Container>
  )
}

export default Personal
