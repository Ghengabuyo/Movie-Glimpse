import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import nameContext from "../Contexts/nameContext";


function GetStarted({ linkText }) {
  const { displayName, setDisplayName } = useContext(nameContext);
  const [isValid, setIsValid] = useState(false);

  const handleDisplayName = (e) => {

    const name = e.target.value.trim();
    setDisplayName(name);

    localStorage.setItem('displayName', name);
    localStorage.removeItem('favorites');
    setIsValid(name.length > 0);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!displayName.trim()) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <Box
        padding='2'
        maxW='100%' mt={[1, 30, 10]}
        textAlign="center"
        display='block'
      >
        <Input
          borderColor='blue.400'
          size='sm'
          maxW={{ base: '200px', md: 'sm' }}
          ml='auto'
          mr='auto'
          _placeholder={{ opacity: 1, color: 'white' }}
          color='white'
          type="text"
          placeholder="Enter your name..."
          value={displayName}
          onChange={handleDisplayName}
          required
        />
        <br />
        <Box
          padding={1}
          flex='1'
          color='white'
          w='100%'
          h='auto'
          mt='2'
          fontSize='lg'
        >
          <button type="submit">
            {isValid ? <Link to='/MainPage'>{linkText}</Link> : linkText}
          </button>
        </Box>
      </Box>

    </form>
  );
}

export default GetStarted;
