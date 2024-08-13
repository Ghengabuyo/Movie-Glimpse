import React from "react";
import { Box, Text, Center } from "@chakra-ui/react";
import { PiStarFill } from "react-icons/pi";

function MyComponent({ voteAverage }) {

  const getStarCount = (voteAverage) => {
    if (voteAverage >= 9) {
      return 5;
    } else if (voteAverage >= 8) {
      return 4;
    } else if (voteAverage >= 7) {
      return 3;
    } else if (voteAverage >= 4) {
      return 2;
    } else {
      return 1;
    }
  };

  const starCount = getStarCount(voteAverage);

  return (

    <Box
      padding={1}
      color="white"
      display="flex"
      alignItems="center"
      ml='5'>
      <Text
        fontSize="lg"
        mr={2}>
        Votes: {voteAverage}
      </Text>
      {Array.from({ length: starCount }, (_, index) => (
        <PiStarFill key={index} />
      ))}
    </Box>

  );
}

export default MyComponent;
