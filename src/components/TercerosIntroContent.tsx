import { CheckCircleIcon, TimeIcon } from "@chakra-ui/icons"
import { List, ListItem, ListIcon, Text, Button } from "@chakra-ui/react"
import { AiOutlineChrome } from "react-icons/ai"

export const TercerosIntroContent = () => {
  return (<>
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
      disabled
      opacity={'0.5'}
      variant='outline'
      colorScheme='red'
      aria-label='Instalar extension de Chrome'
      fontSize='md'
      leftIcon={<AiOutlineChrome />}
    >Instalar extension de Chrome (Pronto)</Button>
  </>)
}