import { Flex, Text } from '@chakra-ui/react'

function Tagline() {

  return (
    <Flex justifyContent='center'>
      <Text
        fontStyle="italic"
        fontSize={{ base: 'md', md: 'lg', lg: 'xl', xl: '3xl' }}>
        The excitement begins: Watch the thrilling trailer NOW!
      </Text>
    </Flex>

  );
}

export default Tagline; 