import { Text, View } from "react-native";
import { NavbarButton, NavbarContainer } from "./styles";
import { Feather } from '@expo/vector-icons'

export default function Navbar() {

  return (
    <NavbarContainer>

      <NavbarButton>
        <Feather name="home" size={24} color="black" />
        <Text>Home</Text>
      </NavbarButton>

      <NavbarButton>
        <Feather name="search" size={24} color="black" />
        <Text>Pesquisar</Text>
      </NavbarButton>

      <NavbarButton>
        <Feather name="shopping-cart" size={24} color="black" />
        <Text>Carrinho</Text>
      </NavbarButton>

      <NavbarButton>
        <Feather name="user" size={24} color="black" />
        <Text>Perfil</Text>
      </NavbarButton>
    </NavbarContainer>
  );
}
