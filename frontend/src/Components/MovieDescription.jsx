import { Text } from '@chakra-ui/react'

function MovieDescription({ description }) {

  return (
    <Text
      padding='4'
      fontStyle="italic">
      {description}
    </Text>
  );
}

export default MovieDescription;