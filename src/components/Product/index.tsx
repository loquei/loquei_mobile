import React, { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native';
import { ProductCardContainer, ProductImage, ProductInfo, ProductTitle, ProductPrice, AddToCartButton, ButtonText, ProductAbout, FavoriteButton } from './styles';
import { Heading } from '@/styles/GlobalStyles';

import { Feather } from '@expo/vector-icons';

type ProductDataProps = {
  id: number;
  product_title: string;
  description: string;
  price: number;
  // thumbnail: ImageProps;
};

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps;
};

const ProductCard = forwardRef<TouchableOpacity, ProductProps>(({ data, ...rest }, ref) => {
  return (
    <ProductCardContainer ref={ref} {...rest}>
      {/* <Image source={data.thumbnail} /> */}
      <ProductImage>
        <Text style={Heading.H2}>Image</Text>
        <FavoriteButton>
          <Feather name="heart" size={24} color="white" />
        </FavoriteButton>
      </ProductImage>

      <ProductInfo>
        <ProductAbout>
          <ProductTitle numberOfLines={3}>{data.product_title}</ProductTitle>
          <Text style={Heading.body}>Avaliação</Text>
          <ProductPrice style={Heading.H1}>R${data.price}</ProductPrice>
        </ProductAbout>

        <AddToCartButton>
          <ButtonText>Adicionar ao carrinho</ButtonText>
        </AddToCartButton>
      </ProductInfo>
    </ProductCardContainer>
  );
});

export default ProductCard;
