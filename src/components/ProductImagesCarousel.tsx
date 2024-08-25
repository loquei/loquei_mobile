import { HStack, VStack, View, Text } from "@gluestack-ui/themed";
import { useRef, useState } from "react";
import { useWindowDimensions } from "react-native";

import CarouselComponent, {
  ICarouselInstance,
} from "react-native-reanimated-carousel";

interface ICarouselProps {
  setScrollEnabled: (value: boolean) => void;
}


export function ProductImagesCarousel({ setScrollEnabled }: ICarouselProps) {
  const ref = useRef<ICarouselInstance>(null);
  const data = Array.from({ length: 3 }, (_, i) => i);
  const windowWidth = useWindowDimensions().width;

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <VStack px={16} height={200}>
      <CarouselComponent
        loop={false}
        ref={ref}
        style={{ width: "100%", height: 200, borderRadius: 16, marginTop: 16 }}
        width={windowWidth}
        data={data}
        renderItem={({ index }) => (
          <View
            key={index}
            w={windowWidth}
            h={200}
            bg={index % 2 === 0 ? "yellow" : "green"}
            borderRadius={16}
            px={16}
            py={16}
          >
            <Text>{index}</Text>
          </View>
        )}
        pagingEnabled
        onSnapToItem={(index): void => setActiveIndex(index)} // Atualiza o índice atual
        onScrollBegin={() => setScrollEnabled(false)} // Desabilita o scroll da tela
        onScrollEnd={() => setScrollEnabled(true)} // Habilita o scroll da tela
      />

      {/* Indicadores abaixo do carrossel */}
      <HStack justifyContent="center" mt={4}>
        {data.map((_, index) => (
          <View
            key={index}
            w={8}
            h={8}
            borderRadius={4}
            mx={4}
            bg={index === activeIndex ? "white" : "$secondary300"}
          />
        ))}
      </HStack>
    </VStack>
  )
}