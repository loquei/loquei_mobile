import { Category } from "@components/Category";
import { ProductCard } from "@components/ProductCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { HStack, VStack, Text } from "@gluestack-ui/themed";

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, SectionList } from "react-native";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [categories, setCategories] = useState(['Eletrônicos', 'Festa', 'Ferramentas', 'Carros']);
  const [categorySelected, setCategorySelected] = useState('');

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
      <VStack>
        <ScreenHeader title="São Paulo, SP" iconButton />

        <FlatList

          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Category
              name={item}
              isActive={categorySelected.toLowerCase() === item.toLowerCase()}
              onPress={() => setCategorySelected(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          style={{ marginTop: 16, maxHeight: 44, minHeight: 44 }}
        />

        <SectionList
          scrollEnabled={false}
          sections={[
            {
              title: 'Principais produtos',
              data: [
                { id: '1', title: 'Smartphone Samsung Galaxy S21', price: 'R$ 3.999,00' },
                { id: '2', title: 'Smartwatch Samsung Galaxy Watch 4', price: 'R$ 1.199,00' },
                { id: '3', title: 'Notebook Dell Inspiron 15', price: 'R$ 4.999,00' },
                { id: '4', title: 'Smart TV LG 50" 4K', price: 'R$ 2.499,00' },
              ]
            }
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => null} // Rendered in renderSectionHeader
          renderSectionHeader={({ section }) => (
            <VStack>
              <Text px={16} pb={8} fontFamily="$heading" fontSize="$lg" color="$textDark800">
                {section.title}
              </Text>
              <FlatList
                data={section.data}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable onPress={() => navigation.navigate('productDetails')}>
                    <ProductCard />
                  </Pressable>
                )}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                ItemSeparatorComponent={() => <HStack width={12} />}
              />
            </VStack>
          )}
          style={{ marginTop: 16 }}
        />

        <SectionList
          scrollEnabled={false}
          sections={[
            {
              title: 'Vistos recentemente',
              data: [
                { id: '1', title: 'Smartphone Samsung Galaxy S21', price: 'R$ 3.999,00' },
                { id: '2', title: 'Smartwatch Samsung Galaxy Watch 4', price: 'R$ 1.199,00' },
                { id: '3', title: 'Notebook Dell Inspiron 15', price: 'R$ 4.999,00' },
                { id: '4', title: 'Smart TV LG 50" 4K', price: 'R$ 2.499,00' },
              ]
            }
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => null} // Rendered in renderSectionHeader
          renderSectionHeader={({ section }) => (
            <VStack>
              <Text px={16} py={8} fontFamily="$heading" fontSize="$lg" color="$textDark800">
                {section.title}
              </Text>
              <FlatList
                data={section.data}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable onPress={() => navigation.navigate('productDetails')}>
                    <ProductCard />
                  </Pressable>
                )}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                ItemSeparatorComponent={() => <HStack width={12} />}
              />
            </VStack>
          )}
          style={{ marginTop: 16 }}
        />

        <Text fontFamily="$body" fontSize="$md" color="$textDark800" textAlign="center" mt={16}>
          © 2021 Loquei. Todos os direitos reservados.
        </Text>
      </VStack>
    </ScrollView>
  );
}
