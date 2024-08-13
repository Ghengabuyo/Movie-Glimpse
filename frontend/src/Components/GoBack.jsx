import { Link } from "react-router-dom";
import { Box, Flex } from '@chakra-ui/react'
import { IoArrowBack } from "react-icons/io5";

function GoBack() {

  return (
    <Box
      mt={6}
      ml={6}
      display='inline-block'>
      <Link to="/MainPage">
        <Flex alignItems="center">
          <IoArrowBack />
          <Box
            ml={2}
            fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}
          >
            Back
          </Box>
        </Flex>
      </Link>
    </Box>

  );
}

export default GoBack;