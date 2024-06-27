import HeroSection from './HeroSection/HeroSection';
import Maresdi from './Maresdis/Maresdis';
import Boxes from './Boxes/Boxes';
//import header from './header.jsx';
import Header from '../../components/header/header';

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Maresdi />
      <Boxes />
    </div>

  );

}

export default Home;