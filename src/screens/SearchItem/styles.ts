import { theme } from "@/theme";
import styled from "styled-components/native";


export const Container = styled.ScrollView`
  display:flex;
  flex:1;
`


export const ContainerHeader = styled.View`
  display:flex;
  flex:1;
  align-items:center;
  justify-content:space-around;
  flex-direction:row;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.body};
  font-size:24px;
  margin-top:10px;
  margin-left:20px;
`;

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.gray200,
  placeholder: 'Pesquisar',
  style: {
    fontFamily: theme.fonts.body,
  }
})`
  border-radius: 8px;
  height: 50px;
  padding: 0 16px;
  border-color: ${theme.colors.gray200};
  border-width: 1px;
  font-family: ${theme.fonts.body};
  width:70%;
  margin-bottom:10px;
  `;
