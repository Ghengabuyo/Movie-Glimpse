import { Box, Heading, Text } from '@chakra-ui/react';

function MyHeading() {
  return (
    <Box
      textAlign="center"
      mt="20px "
    >
      <Heading
        w='100%'
        mt={{ base: '', md: 'md', lg: 'lg', xl: '10' }}
        mb='2'
        overflow='hidden'
      >
        <Text
          fontFamily="heading"
          as="span"
          color="white"
          fontSize={{ base: 'xl', md: '2xl', lg: '3xl', xl: '4xl' }}
          padding='1'
        >
          Unleash the
        </Text>
        <Text
          as="span"
          color="blue.400"
          fontSize={{ base: 'xl', md: '2xl', lg: '3xl', xl: '4xl' }}>
          Excitement:
        </Text>
      </Heading>
      <Heading
        fontSize={{ base: '2xl', md: '3xl', lg: '4xl', xl: '5xl' }}
        color="white"
        overflow='hidden'
      >
        Explore New Trailers Daily
      </Heading>
    </Box>
  );
}

export default MyHeading;
