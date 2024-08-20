import { Category } from "@components/Category";
import { ScreenHeader } from "@components/ScreenHeader";
import { HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useState } from "react";
import { FlatList } from "react-native";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [categories, setCategories] = useState(['Eletrônicos', 'Festa', 'Ferramentas', 'Carros'])
  const [categorySelected, setCategorySelected] = useState('')

  return (
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
        style={{ marginVertical: 16, maxHeight: 44, minHeight: 44 }}
      />
    </VStack>
  )
}