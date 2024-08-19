import { HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  return (
    <VStack>
      <Text color="$white">Home</Text>

      <VStack>
        <Pressable onPress={() => navigation.navigate('productDetails')}>
          <Text color="$white">ProductDetails</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('searchCategory')}>
          <Text color="$white">SearchCategory</Text>
        </Pressable>
      </VStack>
    </VStack>
  )
}