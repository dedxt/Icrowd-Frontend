import React from 'react';

import Image from '../Image/Image';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import FeatRequester from '../FeatRequester/FeatRequester';

function Home() {
  return (
    <div>
      <NavBar />
      <Image />
      <FeatRequester />
      <Footer />
    </div>
  );
}

export default Home;
