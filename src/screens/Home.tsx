import { HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  return (
    <VStack>
      <Text color="$textDark800">Home</Text>

      <VStack>
        <Pressable onPress={() => navigation.navigate('productDetails')}>
          <Text color="$textDark800">ProductDetails</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('searchCategory')}>
          <Text color="$textDark800">SearchCategory</Text>
        </Pressable>
      </VStack>
    </VStack>
  )
}