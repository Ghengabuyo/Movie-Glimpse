import { Box, Text, Center } from "@chakra-ui/react";

function AppName({ appName }) {
  return (
    <Center >
      <Box
        padding={1}
        flex="1"
        bg="blue.400"
        color="white"
        w="100%"
        h="auto"
      >
        <Text
          fontFamily=''
          fontSize="xl"
          textAlign="center"
        >
          {appName}
        </Text>
      </Box>
    </Center>
  );
}

export default AppName;
