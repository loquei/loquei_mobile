import { CategoryButton } from "@/components/CategoryButton";
import { Container, ContainerHeader, SearchInput, Title } from "./styles";
import { ALL_CATEGORIES } from "@/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FlatList } from "react-native";
export default function SearchItem() {
  return (
    <Container>
      <ContainerHeader>
        <AntDesign name="search1" size={30} color="black" />
        <SearchInput />
      </ContainerHeader>
      <Title>Categorias</Title>
      <FlatList
        data={ALL_CATEGORIES}
        keyExtractor={(item) => item as string}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <CategoryButton title={item as string} />}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        style={{
          marginTop: 30,
          marginBottom: 15,
          maxHeight: 40,
        }}
      />
    </Container>
  );
}
