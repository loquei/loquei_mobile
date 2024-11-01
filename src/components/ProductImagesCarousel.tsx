import { HStack, VStack, View, Text, Image } from "@gluestack-ui/themed";
import { useRef, useState } from "react";
import { useWindowDimensions } from "react-native";

import CarouselComponent, {
  ICarouselInstance,
} from "react-native-reanimated-carousel";

interface ICarouselProps {
  setScrollEnabled: (value: boolean) => void;
  imagesPaths: string[];
}

export function ProductImagesCarousel({ setScrollEnabled, imagesPaths }: ICarouselProps) {
  const ref = useRef<ICarouselInstance>(null);
  const data = Array.from({ length: imagesPaths.length }, (_, i) => i);
  const windowWidth = useWindowDimensions().width;
  const baseURL = process.env.EXPO_BASE_URL;

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <VStack px={16} height={230} marginTop={16}>
      <CarouselComponent
        loop={false}
        ref={ref}
        style={{ width: "100%", height: 200, borderRadius: 16 }}
        width={windowWidth}
        data={data}
        renderItem={({ index }) => (
          <View
            key={index}
            h={200}
            width={windowWidth - 32}
            flex={1}
            borderRadius={16}
          >
            <Image source={{
              uri:
                baseURL + imagesPaths[index]
            }} w={200} h={200} alt="" objectFit="cover" alignSelf="center" />
          </View>
        )}
        pagingEnabled
        onSnapToItem={(index): void => setActiveIndex(index)} // Atualiza o índice atual
        onScrollBegin={() => setScrollEnabled(false)} // Desabilita o scroll da tela
        onScrollEnd={() => setScrollEnabled(true)} // Habilita o scroll da tela
      />

      <HStack justifyContent="center" alignItems="center">
        <HStack
          alignItems="center"
          zIndex={1}
        >
          {data.map((_, index) => (
            <View
              key={index}
              w={40}
              h={8}
              borderRadius={4}
              mx={4}
              bg={index === activeIndex ? "$teal600" : "$secondary300"}
            />
          ))}
        </HStack>

        <HStack position="absolute" right={0}>
          <Text color="$teal600" fontFamily="$mono" fontSize="$sm" px={16} bg="$green100" lineHeight={24} rounded={"$full"}>
            {activeIndex + 1}/{data.length}
          </Text>
        </HStack>
      </HStack>

    </VStack>
  );
}
