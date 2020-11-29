import { HeaderContainer, Logo } from './styles';

import Icone from '../../assets/icone.png';

const Header = ({ children }) => (
  <HeaderContainer>
    <Logo src={Icone} alt="Pitu - Encurtador de URL" />
    <h1>Pitu</h1>
    <p>{ children }</p>
  </HeaderContainer>
);

export default Header;
