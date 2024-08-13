import GetStarted from "../Components/GetStarted";
import MyHeading from "../Components/MyHeading";
import SubHeading from "../Components/SubHeading";
import style from './HomePage.module.css';
import { Box, Image } from '@chakra-ui/react'
import AppName from "../Components/AppName";

function HomePage() {

  return (

    <div className={style.homepageBg}>
      <Box >
        <AppName fontFamily="body" appName={'Movie Glimpse'} />
        <div className={style.homePageBox}>
          <MyHeading />
          <SubHeading />

          <Box w='100%'>
            <Image
              boxSize='100%'
              objectFit='contain'
              src="/homepagegif.gif"
              alt="Movie"
              width='100%'
              h='250px'
            />
          </Box>

          <GetStarted linkText="Click to get started" />

        </div>
      </Box>
    </div>

  );
}

export default HomePage;