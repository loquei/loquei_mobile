import { theme } from "@/theme";
import styled from "styled-components/native";


const BaseInputs = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.gray200,
  style: {
    fontFamily: theme.fonts.body,
  },
})`
  border-radius: 8px;
  height: 60px;
  padding: 0 16px;
  border-color: ${theme.colors.gray800};
  border-width: 0.5px;
  font-family: ${theme.fonts.body};
  width:70%;
`;

export const Container = styled.ScrollView`
 flex: 1;
  height: 100%;
  background-color: ${theme.colors.gray50};
`;

export const Title = styled.Text`
  font-size:24px;
  align-self:center;
   font-family: ${theme.fonts.title};
`;


export const Form = styled.View`
  flex:1;
  align-items:center;
  align-self:center;
  flex-direction:column;
  width:100%;
  margin-top:12px;
`;

export const InputLabel = styled.Text`
  font-size:20px;
  font-weight:bold;
  align-self:flex-start;
  margin-left:65px;
  margin-bottom:10px;
  margin-top:10px;
`;

export const NickNameInput = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.gray200,
  placeholder: 'Ex:João  Silva',
  style: {
    fontFamily: theme.fonts.body,
  }
})`
  border-radius: 8px;
  height: 60px;
  padding: 0 16px;
  border-color: ${theme.colors.gray800};
  border-width: 1px;
  font-family: ${theme.fonts.body};
  width:70%;
  margin-bottom:10px;
`;
export const NameInput = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.gray200,
  placeholder: 'Ex:João da Silva',
  style: {
    fontFamily: theme.fonts.body,
  }
})`
  border-radius: 8px;
  height: 60px;
  padding: 0 16px;
  border-color: ${theme.colors.gray800};
  border-width: 1px;
  font-family: ${theme.fonts.body};
  width:70%;
  `;
export const EmailInput = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.gray200,
  placeholder: 'Ex:joao@gmail.com',
  style: {
    fontFamily: theme.fonts.body,
  }
})`
  border-radius: 8px;
  height: 60px;
  padding: 0 16px;
  border-color: ${theme.colors.gray800};
  border-width: 1px;
  font-family: ${theme.fonts.body};
  width:70%;
  `;
export const PhoneInput = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.gray200,
  placeholder: 'EX:(87)99999-9999',
  style: {
    fontFamily: theme.fonts.body,
  }
})`
  border-radius: 8px;
  height: 60px;
  padding: 0 16px;
  border-color: ${theme.colors.gray800};
  border-width: 1px;
  font-family: ${theme.fonts.body};
  width:70%;
  `;
export const CPFInput = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.gray200,
  placeholder: 'EX:0123456789',
  style: {
    fontFamily: theme.fonts.body,
  }
})`
  border-radius: 8px;
  height: 60px;
  padding: 0 16px;
  border-color: ${theme.colors.gray800};
  border-width: 1px;
  font-family: ${theme.fonts.body};
  width:70%;
  `;
export const BirthDateInput = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.gray200,
  placeholder: 'EX:0123456789',
  style: {
    fontFamily: theme.fonts.body,
  }
})`
  border-radius: 8px;
  height: 60px;
  padding: 0 16px;
  border-color: ${theme.colors.gray800};
  border-width: 1px;
  font-family: ${theme.fonts.body};
  width:70%;
  `;

export const CreateAccountButton = styled.TouchableOpacity`
    background-color: ${theme.colors.primary300};
    height: 60px;
    width:70%;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    margin-top:20px;
`;

export const CreateAccountButtonText = styled.Text`
    text-align: center;
    align-items: center;
    font-family: ${theme.fonts.title};
    color: ${theme.colors.white100};
    font-size: ${theme.fontSizes.textLG}px;
`
