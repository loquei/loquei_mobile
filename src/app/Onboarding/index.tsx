import { View } from 'react-native'
import { Container, Title, OnboardingImage, Description, LetStartButton, ButtonText } from './styles'
import { Heading } from '@/styles/GlobalStyles';
import { useRouter } from "expo-router";

export default function Onboarding() {
  const router = useRouter();
  return (
    <Container>
      <OnboardingImage
        source={require('../../../assets/images/onBoarding.png')}
      />
      <Title style={Heading.H1}>Alugue direto pelo seu celular!</Title>
      <Description style={Heading.defaultText}>
        Faça uma negociação em nossa plataforma e alugue o que desejar sem dificuldades.
      </Description>

      <LetStartButton onPress={() => router.navigate('/Home')}>
        <ButtonText style={Heading.H2}>Começar agora</ButtonText>
      </LetStartButton>
    </Container>
  );
};
