import React from 'react';
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const Search = ({ value, onChange }) => {
  return (
    <Box py={9} textAlign="center">
      <InputGroup w={{ base: '75%', md: 'md', lg: 'lg', xl: 'xl' }} margin="0 auto">
        <Input
          type="text"
          placeholder="Search..."
          _placeholder={{ opacity: 1, color: 'white' }}
          color='white'
          value={value}
          onChange={onChange}
          pr="4.5rem"
        />
        <InputRightElement width="4.5rem" h="100%">
          <IconButton
            bg="transparent"
            color='blue.400'
            icon={<SearchIcon />}
            size="md"
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}

export default Search;
