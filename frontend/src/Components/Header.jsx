import React from "react";
import { useContext } from "react";
import nameContext from "../Contexts/nameContext";
import MyFavorites from "./MyFavorites";
import { Icon } from '@chakra-ui/react'
import { PiListHeartDuotone } from "react-icons/pi";
import { useBreakpointValue } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Button,
  Flex,
  Text
} from '@chakra-ui/react';


function Header({ favorites, onRemoveFavorite }) {
  const { displayName } = useContext(nameContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const heartIcon = <Icon
    as={PiListHeartDuotone}
    mr={2}
    boxSize={6}
  />

  const buttonContent = useBreakpointValue({
    base: heartIcon,
    md: <>{heartIcon}
      Favorites</>,
    lg: <>{heartIcon}
      Favorites</>,
    xl: <>{heartIcon}
      Favorites</>
  });


  return (

    <>
      <Box
        bg="blue.400"
        w="100%"
        p={4}
        color="white"
      >
        <Flex
          justify="space-between"
          align="center"
          textAlign="center"
        >
          <Box
            display={{ base: 'block', md: 'flex', lg: 'flex', xl: 'flex' }}
            fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}
          >
            <Text mr={1}> Movie </Text>
            <Text> Glimpse</Text>
          </Box>
          <Flex align="center">
            <Box
              mr="5"
              fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}>
              <p>Hi, {displayName}</p>
            </Box>

            <Button
              ref={btnRef}
              onClick={onOpen}
              colorScheme="teal"
              margin="0 auto"
            >
              {buttonContent}
            </Button>
          </Flex>
        </Flex>


        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="xs"
        >
          <DrawerOverlay />
          <DrawerContent
            maxW="270px"
            w="100%"
            bgGradient="linear(to-tr, white, blue.400)"
          >
            <DrawerCloseButton />
            <DrawerBody overflowY="auto">
              <MyFavorites
                favorites={favorites}
                onRemoveFavorite={onRemoveFavorite} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

export default Header;