import { CategoryCard } from "@components/CategoryCard";
import { SearchInput } from "@components/SearchInput";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { SectionList, SectionListData } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useQuery } from "@tanstack/react-query";
import { ICategories } from "../@types/TCategories";
import { ListCategories } from "../api/listCategory";

interface SectionData {
  title: string;
  data: ICategories[][];
}

export function Search() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleSearch = () => {
    navigation.navigate("searchResults", { searchTerm: searchQuery });
  };

  const renderCategoryRow = (data: { item: ICategories[] }) => {
    const items = data.item;
    // fazer o grid para deixar com duas cols
    return (
      <HStack justifyContent="space-between" py={2} gap={8}>
        {items.map((item) => (
          <CategoryCard
            key={item.id}
            name={item.name}
            icon={item.name}
            id={item.id}
          />
        ))}
      </HStack>
    );
  };

  const { data: ListCategory } = useQuery({
    queryKey: ["categories"],
    queryFn: ListCategories,
  });

  useEffect(() => {
    if (ListCategory) {
      setCategories(ListCategory);
    }
  }, []);

  const sectionedData: SectionData[] = [
    {
      title: "Categorias",
      data: [categories],
    },
  ];

  return (
    <VStack px={16} mt={16} flex={1}>
      <SearchInput onChangeText={handleSearchChange} onSearch={handleSearch} />

      <SectionList
        sections={sectionedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCategoryRow}
        renderSectionHeader={({ section }) => (
          <Text
            py={8}
            fontFamily="$heading"
            fontSize="$lg"
            color="$textDark800"
          >
            {section.title}
          </Text>
        )}
        ItemSeparatorComponent={() => <HStack height={10} />}
        style={{ marginTop: 16 }}
      />
    </VStack>
  );
}
