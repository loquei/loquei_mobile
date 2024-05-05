import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ProductCard from '../Product';
import { ProductListContainer, ProductListHeader, ProductListHeaderLink } from './styles';
import { Heading } from '@/styles/GlobalStyles';

type ProductDataProps = {
  id: number;
  product_title: string;
  description: string;
  price: number;
};

type ProductListProps = {
  title: string;
  data: ProductDataProps[];
};

const ProductList = ({ title, data }: ProductListProps) => {
  return (
    <ProductListContainer style={{ marginBottom: 20 }}>
      <ProductListHeader>
        <Text style={Heading.H2}>{title}</Text>
        <ProductListHeaderLink style={Heading.defaultText}>Ver mais</ProductListHeaderLink>
      </ProductListHeader>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard data={item} />
        )}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        contentContainerStyle={{ marginTop: 23, marginBottom: 20, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
    </ProductListContainer>
  );
};


export default ProductList;
