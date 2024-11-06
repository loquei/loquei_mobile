import { CategoryCard } from "@components/CategoryCard";
import { SearchInput } from "@components/SearchInput";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { SectionList, SectionListData } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

interface CategoryItem {
  id: string;
  title: string;
}

interface SectionData {
  title: string;
  data: CategoryItem[][];
}

export function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleSearch = () => {
    navigation.navigate("searchResults", { searchTerm: searchQuery });
  };

  const renderCategoryRow = (data: { item: CategoryItem[] }) => {
    const items = data.item;
    return (
      <HStack justifyContent="space-between" py={2} gap={8}>
        {items.map((item) => (
          <CategoryCard key={item.id} name={item.title} icon={item.title} />
        ))}
      </HStack>
    );
  };

  const sectionedData: SectionData[] = [
    {
      title: "Categorias",
      data: [
        [
          { id: "1", title: "Eletrônicos" },
          { id: "2", title: "Roupas" },
        ],
        [
          { id: "3", title: "Móveis" },
          { id: "4", title: "Eletrônicos" },
        ],
        [
          { id: "5", title: "Roupas" },
          { id: "6", title: "Móveis" },
        ],
      ],
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
          <Text py={8} fontFamily="$heading" fontSize="$lg" color="$textDark800">
            {section.title}
          </Text>
        )}
        ItemSeparatorComponent={() => <HStack height={10} />}
        style={{ marginTop: 16 }}
      />
    </VStack>
  );
}
