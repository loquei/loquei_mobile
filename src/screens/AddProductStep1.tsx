import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { Select } from "@components/Select";
import { Textarea } from "@components/Textarea";
import {
  HStack,
  onChange,
  Progress,
  ProgressFilledTrack,
} from "@gluestack-ui/themed";
import { VStack, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as y from "yup";
import { PostItemSchema } from "../schemas/CreateItemSchema";
//import AsyncStorage from "@react-native-async-storage/async-storage";
export function AddProductStep1() {
  const progressValue = 0;

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  type CreateItemSchema = y.InferType<typeof PostItemSchema>;

  const { control, handleSubmit } = useForm<CreateItemSchema>({
    defaultValues: {
      name: "",
      description: "",
      daily_value: 0,
      max_days: 0,
      min_days: 0,
      categories_id: [],
    },
  });
  const handleNavigateToAddProductStep2 = () => {
    console.log("clic");
    navigation.navigate("addProductStep2");
  };
  const handleNavigateToNextStep = async (data: CreateItemSchema) => {
    handleNavigateToAddProductStep2();
    try {
      // await AsyncStorage.setItem("Step1CreateProduct", JSON.stringify(data));
    } catch {
      console.log("falhou");
    }
  };
  return (
    <VStack flex={1}>
      <ScreenHeader title="Adicionar Produto" backButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          marginTop: 16,
        }}
      >
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
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
            Nome do produto
          </Text>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onBlur, onChange } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Ex: Ferramenta de jardinagem"
              />
            )}
          />
        </VStack>

        <VStack mt={16} gap={8}>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
            Descrição
          </Text>
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onBlur, onChange } }) => (
              <Textarea
                placeholder="Digite a descrição do produto"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </VStack>

        <VStack mt={16} gap={8}>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
            Categoria
          </Text>
          <Controller
            control={control}
            name="categories_id"
            rules={{ required: true }}
            render={({ field: { onBlur } }) => (
              <Select
                placeholder="Selecione a categoria"
                onBlur={onBlur}
                options={[
                  "Eletrônicos",
                  "Móveis",
                  "Roupas",
                  "Acessórios",
                  "Livros",
                  "Jogos",
                  "Brinquedos",
                ]}
              />
            )}
          />
        </VStack>

        <VStack mt={16} gap={8} flex={1}>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
            Por quanto tempo você deseja alugar:
          </Text>
          <HStack gap={8} justifyContent="space-between">
            <Controller
              name="min_days"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  placeholder="mínimo"
                  keyboardType="numeric"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="min_days"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  placeholder="máximo"
                  keyboardType="numeric"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
          </HStack>
        </VStack>

        <Button
          title="Próxima etapa"
          onPress={handleNavigateToAddProductStep2}
          mt={16}
        />
      </ScrollView>
    </VStack>
  );
}
