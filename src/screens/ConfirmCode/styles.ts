import { styled } from 'styled-components/native';
import { theme } from '@/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray50};
  margin-top: 10px;
  justify-content: center;
`;

export const PrincipalText = styled.Text`
  font-size: 20px;
  align-self: center;
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  align-self: center;
`;

export const CodeInput = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.gray200,
  placeholder: "Digite o codigo",
  style: {
    fontFamily: theme.fonts.body,
  }
})`
  border-radius:8px;
  height:60px;
  width:80%;
  align-self:center;
  padding:0 16px;
  border-color:${theme.colors.gray800};
  border-width:0.5px;
  font-family:${theme.fonts.body};
  margin-top:25px;
  margin-bottom:25px;
`;
export const ConfirmarButton = styled.TouchableOpacity`
  padding:8px;
  width:80%;
  align-self: center;
  background-color: ${theme.colors.primary200};
  `;

export const TextConfirmar = styled.Text`
    text-align: center;
    align-items: center;
    font-family: ${theme.fonts.title};
    color: ${theme.colors.white100};
    font-size: ${theme.fontSizes.textLG}px;
`;

export const ErroMensagem = styled.Text`
    color: ${theme.colors.danger100};
    margin-top: 8px;
    margin-bottom: 16px;
    align-self:center;
`;