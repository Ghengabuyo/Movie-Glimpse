import { Text } from "@chakra-ui/react";

function MovieLanguage({ originalLanguage }) {
  return (
    <div>
        <Text
          mt={3}
          ml={5}
          mb={5}
        >
          Movie Language: {originalLanguage}
        </Text>
    </div>
  );
}

export default MovieLanguage;
