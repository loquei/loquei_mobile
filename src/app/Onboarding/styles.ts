import { styled } from 'styled-components'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { theme } from '@/theme'

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  padding: 0 20px;
`

export const Title = styled(Text)`
  text-align: center;
`
export const Description = styled(Text)`
  align-items: center;
  margin-top: 16px;
  margin-bottom: 32px;
  font-family: ${theme.fonts.body};
  color: ${theme.colors.gray500};
  text-align: left;
`
export const LetStartButton = styled(TouchableOpacity)`
    background-color: ${theme.colors.primary300};
    padding: 12px;
    border-radius: 8px;
`

export const ButtonText = styled(Text)`
    text-align: center;
    color: ${theme.colors.white100};
`

export const OnboardingImage = styled(Image)`
    align-self: center;
    width: 350px;
    height: 350px;
    margin-bottom: 64px;
`