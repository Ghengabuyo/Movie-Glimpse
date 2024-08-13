import React from "react";
import MoviePoster from "./MoviePoster";
import { Link } from "react-router-dom";
import { CardBody, AspectRatio, Divider, Stack, Heading, Card, Button, Box, Flex, Text } from "@chakra-ui/react";
import { RiDeleteBin5Fill } from "react-icons/ri";

function MyFavorites({ favorites, onRemoveFavorite, width, height }) {

  const handleRemoveFavorite = (id) => {
    onRemoveFavorite(id);
  };


  return (
    <Box textAlign="center" mt={4}>
      <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}>My Favorites</Text>
      {favorites.length > 0 ? (
        <Flex
          as="ul"
          direction="row"
          wrap="wrap"
          justifyContent="center"
          alignItems="center"
          gap={4}
          listStyleType="none"
          padding={0}
        >
          {favorites.map((favorite, index) => (
            <Box
              as="li"
              key={index}
              mb={4}
              mt={9}
            >
              <Link to={`/movie/${favorite.id}`}>
                <Card
                  width="200px"
                  height="350px"
                  justifyContent="center"
                  borderRadius="0 12px 12px 12px"
                  borderWidth="2px"
                  borderColor="blue"
                  bg="#A6D1E6"
                >
                  <CardBody height="auto" padding="0">
                    <AspectRatio
                      ratio={2 / 3}
                      width={"100%"}
                      height="100%">
                      <MoviePoster
                        posterPath={favorite.posterPath}
                        alt={favorite.title}
                        borderRadius="0 7px 0 0"
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    </AspectRatio>
                  </CardBody>
                  <Divider />
                  <Stack mt="4" spacing="3">
                    <Heading
                      noOfLines={1}
                      textAlign="center"
                      pr="2"
                      mb="2"
                      fontSize="sm">
                      {favorite.title}
                    </Heading>
                  </Stack>
                </Card>
              </Link>
              <Flex
                justify="center"
                align="center"
                mt={2}
                gap={2}
              >
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleRemoveFavorite(favorite.id)}
                >
                  <RiDeleteBin5Fill />
                </Button>
                <Box
                  bg="blue"
                  padding='1'
                  color='white'
                  borderRadius="7px">
                  <Link to={`/movie/${favorite.id}`} size="sm">
                    Watch Trailer
                  </Link>
                </Box>
              </Flex>
            </Box>
          ))}
        </Flex>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </Box>
  );
}


export default MyFavorites;