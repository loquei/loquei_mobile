import { styled } from 'styled-components';
import { TouchableOpacity, View, Text } from 'react-native';
import { theme } from '@/theme';

export const ProductCardContainer = styled(TouchableOpacity)`
  flex: 1;
  background-color: ${theme.colors.gray50};
  max-width: 230px;
  max-height: 420px;
  height: 100%;
  padding: 0;
  align-items: flex-start;
`;

export const ProductImage = styled(View)`
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  background-color: ${theme.colors.gray100};
  border-radius: 8px 8px 0 0;
`

export const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px;
  background-color: ${theme.colors.primary300};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`

export const ProductInfo = styled(View)`
 justify-content: space-between;
`

export const ProductAbout = styled(View)`
  max-height: 165px;
  height: 100%;
  padding: 10px 12px 0 12px;
  justify-content: space-between;
`

export const ProductTitle = styled(Text)`
  font-size: ${theme.fontSizes.textBase}px;
  font-family: ${theme.fonts.title};
  color: ${theme.colors.gray800};
`

export const ProductPrice = styled(Text)`
  color: ${theme.colors.primary300};
  
`

export const AddToCartButton = styled(TouchableOpacity)`
  background-color: ${theme.colors.primary200};
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`

export const ButtonText = styled(Text)`
  color: ${theme.colors.white100};
  font-size: ${theme.fontSizes.textBase}px;
  font-family: ${theme.fonts.title};
`