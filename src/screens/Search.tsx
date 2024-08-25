import { CategoryCard } from "@components/CategoryCard";
import { SearchInput } from "@components/SearchInput";
import { HStack, Text } from "@gluestack-ui/themed";
import { Heading, VStack } from "@gluestack-ui/themed";
import { SectionList } from "react-native";

export function Search() {

  const renderCategoryRow = (data:
    { item: { id: string; title: string }[] }
  ) => {
    const items = data.item;
    return (
      <HStack justifyContent="space-between" py={2} gap={8}>
        {items.map((item:
          { id: string; title: string }
        ) => (
          <CategoryCard key={item.id} name={item.title} icon={item.title} />
        ))}
      </HStack>
    );
  };

  const sectionedData = [
    {
      title: 'Categorias',
      data: [
        [
          { id: '1', title: 'Eletrônicos' },
          { id: '2', title: 'Roupas' }
        ],
        [
          { id: '3', title: 'Móveis' },
          { id: '4', title: 'Eletrônicos' }
        ],
        [
          { id: '5', title: 'Roupas' },
          { id: '6', title: 'Móveis' }
        ]
      ]
    }
  ];

  return (
    <VStack px={16} mt={16} flex={1}>
      <SearchInput />

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
