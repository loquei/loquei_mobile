import { styled } from 'styled-components/native'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import { theme } from '@/theme'

export const Container = styled(View)`
    flex: 1;
    background-color: ${theme.colors.gray50};
    justify-content: center;
    padding: 0 20px;
`

export const Subtitle = styled(Text)`
    font-size: ${theme.fontSizes.textBase}px;
    margin-top: 10px;
    margin-bottom: 75px;
    font-weight: 500;
`

export const EmailInput = styled(TextInput).attrs({
  placeholderTextColor: theme.colors.gray200,
  placeholder: 'Digite seu e-mail...',
  style: {
    fontFamily: theme.fonts.body,
  }
})`
  border-radius: 8px;
  height: 60px;
  padding: 0 16px;
  border-color: ${theme.colors.gray800};
  border-width: 0.5px;
  font-family: ${theme.fonts.body};
`;

export const NewAccount = styled(Text)`
    font-size: ${theme.fontSizes.textSM}px;
    align-self: flex-end;
    margin-top: 20px;
    margin-bottom: 20px;
    color: ${theme.colors.secondary100};
    text-decoration-line: underline;
    font-family: ${theme.fonts.subtitle};
`

export const SignInButton = styled(TouchableOpacity)`
    background-color: ${theme.colors.primary300};
    height: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`

export const SignInButtonText = styled(Text)`
    text-align: center;
    align-items: center;
    font-family: ${theme.fonts.title};
    color: ${theme.colors.white100};
    font-size: ${theme.fontSizes.textLG}px;
`

export const ErrorMessage = styled(Text)`
    color: ${theme.colors.danger100};
    margin-top: 8px;
    margin-bottom: 8px;
`