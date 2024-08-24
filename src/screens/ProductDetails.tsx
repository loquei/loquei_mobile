import { Button } from "@components/Button";
import { ProductCard } from "@components/ProductCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Tag } from "@components/Tag";
import { gluestackUIConfig } from "@gluestack-ui/config";
import { Pressable, Progress, ProgressFilledTrack } from "@gluestack-ui/themed";
import { Accordion, AccordionContent, AccordionContentText, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger, Divider, View } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { SafeAreaView } from "@gluestack-ui/themed";
import { SliderTrack } from "@gluestack-ui/themed";
import { HStack, Slider, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ChevronDownIcon, ChevronUpIcon, Star, StarHalf, StarHalfIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import { FlatList, SectionList, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native";

import Carousel, {
  ICarouselInstance,
} from "react-native-reanimated-carousel";

export function ProductDetails() {
  const ref = useRef<ICarouselInstance>(null);
  const data = Array.from({ length: 3 }, (_, i) => i);
  const windowWidth = useWindowDimensions().width;

  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [rentalTimes, setRentalTimes] = useState(['1 dia', '3 dias', '7 dias']);
  const [rentalTimeSelected, setRentalTimeSelected] = useState('1 dia');

  const { tokens } = gluestackUIConfig;
  const [scrollEnabled, setScrollEnabled] = useState(true);

  return (
    <View flex={1} margin={0} padding={0}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} scrollEnabled={scrollEnabled}>
        <VStack flex={1} pb={32}>
          <ScreenHeader title="Detalhes do produto" backButton />

          <VStack px={16} height={200}>
            <Carousel
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

          <Text fontFamily="$heading" fontSize={"$2xl"} mt={24} px={16} color="$textDark800">
            Apple iPhone 13 Pro Max
          </Text>

          <Text fontFamily="$mono" fontSize={"$lg"} mt={8} px={16} color="$textDark800">
            The iPhone 13 Pro Max features a 6.7-inch Super Retina XDR display, A15 Bionic chip, and a Pro camera system.
          </Text>

          <Text fontFamily="$body" mt={8} px={16} color="$textDark800">
            Available in Graphite, Gold, Silver, and Sierra Blue.
          </Text>

          <VStack mt={16} px={16}>
            <VStack>
              <HStack>
                <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                  De <Text fontFamily="$body" fontSize={"$lg"} textDecorationLine="line-through">R$ 7.599,00</Text>
                </Text>
              </HStack>
              <HStack>
                <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800" alignItems="center">
                  Por <Text fontFamily="$heading" fontSize={"$2xl"} color="$teal600">R$ 7.599,00</Text>
                </Text>
              </HStack>
            </VStack>
          </VStack>

          <VStack mt={16} px={16}>
            <Text fontFamily="$heading" fontSize={"$lg"} color="$textDark800">
              Tempo para aluguel
            </Text>
            <HStack mt={12} justifyContent="space-between">
              <FlatList
                data={rentalTimes}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Tag
                    name={item}
                    isActive={item === rentalTimeSelected}
                    onPress={() => setRentalTimeSelected(item)}
                  />
                )}
                ItemSeparatorComponent={() => <HStack width={12} />}
              />
            </HStack>
          </VStack>

          <VStack mt={16} px={16}>
            <Text fontFamily="$heading" fontSize={"$lg"} color="$textDark800">
              Detalhes do produto
            </Text>
            <Accordion size="sm" variant="unfilled" type="single" isCollapsible={true} isDisabled={false} bg="$white" rounded={"$md"} mt={12}>
              <AccordionItem value="a">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText>
                            Especificações
                          </AccordionTitleText>
                          {isExpanded ? (
                            <AccordionIcon as={ChevronUpIcon} />
                          ) : (
                            <AccordionIcon as={ChevronDownIcon} />
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <AccordionContentText>
                    The iPhone 13 Pro Max comes with a 1-year limited warranty and up to 90 days of complimentary technical support.
                  </AccordionContentText>
                </AccordionContent>
              </AccordionItem>
              <Divider />
              <AccordionItem value="b">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText>
                            Garantia
                          </AccordionTitleText>
                          {isExpanded ? (
                            <AccordionIcon as={ChevronUpIcon} />
                          ) : (
                            <AccordionIcon as={ChevronDownIcon} />
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <AccordionContentText>
                    The iPhone 13 Pro Max comes with a 1-year limited warranty and up to 90 days of complimentary technical support.
                  </AccordionContentText>
                </AccordionContent>
              </AccordionItem>
              <Divider />
              <AccordionItem value="c">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText>
                            Entrega
                          </AccordionTitleText>
                          {isExpanded ? (
                            <AccordionIcon as={ChevronUpIcon} />
                          ) : (
                            <AccordionIcon as={ChevronDownIcon} />
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <AccordionContentText>
                    The delivery time for the iPhone 13 Pro Max is 3-5 business days. Shipping is free.
                  </AccordionContentText>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </VStack>

          <SectionList
            scrollEnabled={false}
            sections={[
              {
                title: 'Produtos relacionados',
                data: [
                  { id: '1', title: 'Smartphone Samsung Galaxy S21', rating: 4, ratingCount: 14, price: 'R$ 3.999,00', discountPrice: 'R$ 3.499,00' },
                  { id: '2', title: 'Smartwatch Samsung Galaxy Watch 4', rating: 4, ratingCount: 14, price: 'R$ 3.999,00', discountPrice: 'R$ 3.499,00' },
                  { id: '3', title: 'Notebook Dell Inspiron 15', rating: 4, ratingCount: 14, price: 'R$ 3.999,00', discountPrice: 'R$ 3.499,00' },
                  { id: '4', title: 'Smart TV LG 50" 4K', rating: 4, ratingCount: 14, price: 'R$ 3.999,00', discountPrice: 'R$ 3.499,00' },
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
                      <ProductCard title={item.title} rating={item.rating} ratingCount={item.ratingCount} />
                    </Pressable>
                  )}
                  contentContainerStyle={{ paddingHorizontal: 16 }}
                  ItemSeparatorComponent={() => <HStack width={12} />}
                />
              </VStack>
            )}
            style={{ marginTop: 16, marginBottom: 16 }}
          />

          <VStack mt={16} px={16}>
            <Text fontFamily="$heading" fontSize={"$lg"} color="$textDark800">
              Avaliações
            </Text>

            <VStack mt={12}>
              <HStack gap={32}>
                <VStack>
                  <Text fontFamily="$heading" fontSize={"$3xl"} color="$textDark800">
                    4.5
                  </Text>

                  <VStack>
                    <HStack>
                      <Star size={20} fill={tokens.colors.yellow500} />
                      <Star size={20} fill={tokens.colors.yellow500} />
                      <Star size={20} fill={tokens.colors.yellow500} />
                      <Star size={20} fill={tokens.colors.yellow500} />
                      <StarHalf size={20} fill={tokens.colors.yellow500} />
                    </HStack>
                    <Text fontFamily="$body" fontSize={"$sm"} color="$textLight600">
                      (14 avaliações)
                    </Text>
                  </VStack>
                </VStack>

                <VStack flex={1}>
                  <HStack alignItems="center" gap={8}>
                    <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                      5
                    </Text>
                    <Progress value={80} size="sm" flex={1}>
                      <ProgressFilledTrack bg="$textDark800" />
                    </Progress>
                    <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                      10
                    </Text>
                  </HStack>
                  <HStack alignItems="center" gap={8}>
                    <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                      4
                    </Text>
                    <Progress value={60} size="sm" flex={1}>
                      <ProgressFilledTrack bg="$textDark800" />
                    </Progress>
                    <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                      3
                    </Text>
                  </HStack>
                  <HStack alignItems="center" gap={8}>
                    <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                      3
                    </Text>
                    <Progress value={40} size="sm" flex={1}>
                      <ProgressFilledTrack bg="$textDark800" />
                    </Progress>
                    <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                      1
                    </Text>
                  </HStack>
                  <HStack alignItems="center" gap={8}>
                    <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                      2
                    </Text>
                    <Progress value={20} size="sm" flex={1}>
                      <ProgressFilledTrack bg="$textDark800" />
                    </Progress>
                    <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                      0
                    </Text>
                  </HStack>
                  <HStack alignItems="center" gap={8}>
                    <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                      1
                    </Text>
                    <Progress value={10} size="sm" flex={1}>
                      <ProgressFilledTrack bg="$textDark800" />
                    </Progress>
                    <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                      0
                    </Text>
                  </HStack>
                </VStack>
              </HStack>

              <Button title="Enviar avaliação" mt={16} buttonVariant="secondary" />

              <FlatList
                scrollEnabled={false}
                data={[
                  { id: '1', name: 'João Silva', rating: 5, comment: 'Excelente produto, recomendo!', date: '10/08/2024' },
                  { id: '2', name: 'Maria Souza', rating: 4, comment: 'Muito bom, atendeu minhas expectativas.', date: '11/08/2024' },
                  { id: '3', name: 'José Santos', rating: 3, comment: 'Poderia ser melhor.', date: '12/08/2024' },
                ]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <VStack mt={16}>
                    <HStack gap={8} width={"auto"} alignItems="center">
                      <View borderRadius={999} bg="$secondary300" w={45} h={45} />
                      <VStack >
                        <Text fontFamily="$mono" fontSize={"$lg"} color="$textDark800">
                          {item.name}
                        </Text>
                        <HStack alignItems="center" gap={10}>
                          <HStack>
                            <Star size={14} fill={tokens.colors.yellow500} />
                            <Star size={14} fill={tokens.colors.yellow500} />
                            <Star size={14} fill={tokens.colors.yellow500} />
                            <Star size={14} fill={tokens.colors.yellow500} />
                            <StarHalf size={14} fill={tokens.colors.yellow500} />
                          </HStack>
                          <Text fontFamily="$body" fontSize={"$sm"} color="$textLight600">
                            {item.date}
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800" mt={8}>
                      {item.comment}
                    </Text>
                  </VStack>
                )}
                ItemSeparatorComponent={() => <Divider mt={16} />}
              />

              <Button title="Ver todas as avaliações" mt={16} buttonVariant="outline" />
            </VStack>
          </VStack>

        </VStack>
      </ScrollView>
      <HStack px={16} py={8} gap={8} justifyContent="space-between" bg="$white" borderTopWidth={1} borderTopColor="$textLight600">
        <Button title="Lista de desejos" buttonVariant="outline" flex={1} />
        <Button title="Alugar" buttonVariant="solid" flex={1} />
      </HStack>
    </View>
  );
}
