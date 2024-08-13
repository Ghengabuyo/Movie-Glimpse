import { Box, Heading, Text } from "@chakra-ui/react";

function SubHeading() {

  return (
    <Box textAlign="center" mt={[9, 15, 15]}>
      <Heading
        size="sm"
        mt={[1, 6, 10, 20]}
        maxW='100%'
        h='auto'
        overflow='hidden'
      >
        <Text
          as="span"
          color="white"
        >
          Dive into the world of Movies.
        </Text>
      </Heading>
      <Heading
        size="sm"
        mt={1}
        overflow='hidden'
      >
        <Text
          as="span"
          color="blue.400"
        >
          Watch Trailers
        </Text>
        <Text
          as="span"
          color="white"
          ml={1}
        >
          any time, anywhere!
        </Text>
      </Heading>
    </Box>
  );


}

export default SubHeading;
