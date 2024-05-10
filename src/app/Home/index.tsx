import { View, Text, FlatList, SectionList, ScrollView } from "react-native";

import { Link, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

import {
  Container,
  Header,
  HeaderFlex,
  HeaderUF,
  HeaderButton,
} from "./styles";
import { Heading } from "@/styles/GlobalStyles";

import { ALL_CATEGORIES, ALL_PRODUCTS, ALL_SECTIONS, PRODUCTS } from "@/data";
import { CategoryButton } from "@/components/CategoryButton";
import ProductList from "@/components/ProductList";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <Navbar />
      <Header>
        <HeaderFlex>
          <Feather name="map-pin" size={40} />

          <View>
            <Text style={[Heading.caption, { lineHeight: 22 }]}>
              São Caetano do Sul,
            </Text>
            <HeaderUF style={Heading.H2}>São Paulo</HeaderUF>
          </View>
        </HeaderFlex>

        <HeaderButton onPress={() => router.push("/SignIn/")}>
          <View>
            <Feather name="user" size={40} />
          </View>
        </HeaderButton>
      </Header>

      <FlatList
        data={ALL_CATEGORIES}
        keyExtractor={(item) => item as string}
        renderItem={({ item }) => <CategoryButton title={item as string} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        style={{ marginTop: 30, marginBottom: 15, maxHeight: 40 }}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <ProductList title="Trending" data={ALL_PRODUCTS[0].data} />
        <ProductList title="Gaming" data={ALL_PRODUCTS[0].data} />
        <ProductList title="Trending" data={ALL_PRODUCTS[0].data} />
      </ScrollView>
    </Container>
  );
}
