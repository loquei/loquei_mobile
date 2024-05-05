import { styled } from 'styled-components'
import { Pressable, Text } from 'react-native'
import { theme } from '@/theme'

export const CategoryButtonPressable = styled(Pressable)`
  background-color: ${theme.colors.gray100};
  border-radius: 8px;
  height: 40px;
  justify-content: center;
  padding: 0 16px;
  margin-bottom: 120px;
`;

export const CategoryText = styled(Text)`
  font-weight: 500;
`