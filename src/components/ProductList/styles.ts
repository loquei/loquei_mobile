import styled from 'styled-components'
import { View, Text } from 'react-native'
import { theme } from '@/theme'

export const ProductListContainer = styled(View)`
  flex: 1;
`
export const ProductListHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`

export const ProductListHeaderLink = styled(Text)`
  font-size: 16px;
  color: ${theme.colors.primary300};
  text-decoration: underline;
`