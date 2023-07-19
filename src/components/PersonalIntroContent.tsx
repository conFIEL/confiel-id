import { CheckCircleIcon } from "@chakra-ui/icons"
import { List, ListItem, ListIcon, Text, Button } from "@chakra-ui/react"
import { IoLogoPwa } from "react-icons/io5"

export const PersonalIntroContent = () => {
  return (
    <>
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
        disabled
        opacity={'0.5'}
        variant='outline'
        colorScheme='red'
        aria-label='Instalar extension de Chrome'
        fontSize='md'
        leftIcon={<IoLogoPwa />}
      >Instalar conFIEL ID (Proximamente)</Button>
    </>)
}