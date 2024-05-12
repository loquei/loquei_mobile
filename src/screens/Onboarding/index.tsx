import {
  Container,
  Title,
  OnboardingImage,
  Description,
  LetStartButton,
  ButtonText,
} from "./styles";
import { Heading } from "@/styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

export default function Onboarding() {
  const navigation = useNavigation();
  const login = () => {
    navigation.navigate("SignIn");
  };

  return (
    <Container>
      <OnboardingImage
        source={require("../../../assets/images/onBoarding.png")}
      />
      <Title style={Heading.H1}>Alugue direto pelo seu celular!</Title>
      <Description style={Heading.defaultText}>
        Faça uma negociação em nossa plataforma e alugue o que desejar sem
        dificuldades.
      </Description>

      <LetStartButton onPress={login}>
        <ButtonText style={Heading.H2}>Começar agora</ButtonText>
      </LetStartButton>
    </Container>
  );
}
