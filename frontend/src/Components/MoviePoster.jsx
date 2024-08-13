import { Box, Image } from "@chakra-ui/react";

function MoviePoster({ posterPath, title, width, height }) {

 // const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <Box
      w="100%"
      h="100%"
      borderRadius="0 7px 0 0"
      overflow="hidden">
      <Image
        src={posterPath}
        alt={title}
        borderRadius="0 7px 0 0"
        objectFit="Cover"
        width={width}
        height={height}
      />
    </Box>
  );
}


export default MoviePoster;
