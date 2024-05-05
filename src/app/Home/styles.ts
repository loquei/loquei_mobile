import { styled } from 'styled-components/native'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import { theme } from '@/theme'

export const Container = styled(View)`
  flex: 1;
  height: 100%;
`

export const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const HeaderFlex = styled(View)`
  height: fit-content;
  flex-direction: row;
  align-items: center;
  gap: 18px;
`

export const HeaderUF = styled(Text)`
  font-size: ${theme.fontSizes.textXL}px;
  margin-top: 0;
  font-family: ${theme.fonts.title};
`

export const HeaderButton = styled(TouchableOpacity)`
  border-radius: 999px;
  background-color: ${theme.colors.gray200};

  padding: 5px;
`