import { Text } from '@chakra-ui/react'

function OriginCountry({ originCountries }) {
  return (
    <div>
      {originCountries.map((country, index) => (
        <Text
          key={index}
          m={5}
        >
          Origin Country: {country.name}
        </Text>
      ))}
    </div>
  );
}

export default OriginCountry;
