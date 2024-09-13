import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { Select } from "@components/Select";
import { Textarea } from "@components/Textarea";
import { HStack, Progress, ProgressFilledTrack } from "@gluestack-ui/themed";
import { VStack, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ScrollView } from "react-native";

export function AddProductStep1() {
  const progressValue = 0;

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateToAddProductStep2() {
    navigation.navigate('addProductStep2');
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Adicionar Produto" backButton />

      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, marginTop: 16 }}>
        <VStack>
          <Progress value={progressValue} size="sm" width="100%">
            <ProgressFilledTrack bg="$textDark800" />
          </Progress>

          <HStack>
            <Text fontFamily="$body" fontSize="$sm" mt={8}>
              Etapa 1 de 2: Informações do Produto
            </Text>

            <Text fontFamily="$heading" fontSize="$sm" mt={8} ml="auto">
              {progressValue}%
            </Text>
          </HStack>
        </VStack>

        <VStack mt={16} gap={8}>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">Nome do produto</Text>
          <Input
            placeholder="Ex: Ferramenta de jardinagem"
          />
        </VStack>

        <VStack mt={16} gap={8}>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">Descrição</Text>
          <Textarea
            placeholder="Digite a descrição do produto" />
        </VStack>

        <VStack mt={16} gap={8}>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">Categoria</Text>
          <Select
            placeholder="Selecione a categoria"
            options={
              [
                "Eletrônicos",
                "Móveis",
                "Roupas",
                "Acessórios",
                "Livros",
                "Jogos",
                "Brinquedos",
              ]
            }
          />
        </VStack>

        <VStack mt={16} gap={8}>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">Disponilidade de aluguel</Text>
          <Select
            placeholder="Selecione a disponibilidade"
            options={
              [
                "Apenas dias",
                "Dias e semanas",
                "Dias, semanas e meses",
              ]
            }
          />
        </VStack>

        <VStack mt={16} gap={8}>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">Estoque</Text>
          <Input placeholder="Digite a quantidade disponível" keyboardType="numeric" />
        </VStack>

        <VStack mt={16} gap={8}>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">Preço</Text>
          <Input
            placeholder="Ex: R$100,00"
            keyboardType="numeric"
          />
        </VStack>

        <Button title="Próxima etapa" onPress={handleNavigateToAddProductStep2} mt={16} />
      </ScrollView>
    </VStack>
  );
}
