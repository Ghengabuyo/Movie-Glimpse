import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  Box,
  AspectRatio,
} from '@chakra-ui/react';



function MovieCard({ title, posterPath, id }) {

  return (
    <Link to={`/Movie/${id}`}>
      <Card
        maxW="sm"
        borderRadius="0 12px 12px 12px"
        borderWidth='2px'
        borderColor="blue"
        bg='#A6D1E6'
      >

        <CardBody height="100%" padding="0"   >
          <AspectRatio ratio={2 / 3} width="100%" height="100%">
            <Image
              src={posterPath}
              alt="movie"
              borderRadius="0 7px 0 0"
              objectFit="cover"
            />
          </AspectRatio>
        </CardBody>

        <Divider />

        <Stack mt="4" spacing="3">
          <Heading
            noOfLines={{ base: 1, lg: 1 }}
            textAlign='center' pr='2' mb='2'
            fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}
          >
            {title}
          </Heading>
        </Stack>

      </Card>

    </Link>
  );
}






export default MovieCard;