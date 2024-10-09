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
import { postItem } from "../api/postItem";
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
      categories: ["3d32e6414a754167b5dfe9486a7bb12b"],
    },
  });

  const handleNextStep = async (data: CreateItemSchema) => {
    console.log(data);
    try {
      await postItem({
        ...data,
        categories: (data.categories ?? []).filter(
          (category): category is string => category !== undefined
        ),
      });
      navigation.navigate("addProductStep2");
    } catch (error) {
      console.error("Error saving data:", error);
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
            render={({ field: { value, onBlur, onChange } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value?.toString()}
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
            render={({ field: { value, onBlur, onChange } }) => (
              <Textarea
                placeholder="Digite a descrição do produto"
                onBlur={onBlur}
                value={value?.toString()}
                onChangeText={onChange}
              />
            )}
          />
        </VStack>

        <VStack mt={16} gap={8}>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
            Categoria
          </Text>

          <Select
            placeholder="Selecione a categoria"
            options={[
              "Eletronicos",
              "Moveis",
              "Roupas",
              "Acessorios",
              "Livros",
              "Jogos",
              "Brinquedos",
              "Ferramentas",
            ]}
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
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  placeholder="mínimo"
                  keyboardType="numeric"
                  value={value?.toString()}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              name="max_days"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  placeholder="máximo"
                  keyboardType="numeric"
                  value={value?.toString()}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />
          </HStack>
          <VStack mt={16} gap={8} flex={1}>
            <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
              Qual seria o valor da diária:
            </Text>
            <Controller
              name="daily_value"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  placeholder="Digite o valor da diária"
                  keyboardType="numeric"
                  value={value.toString()}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />
          </VStack>
        </VStack>
        <Button
          mt={16}
          title="Proxima etapa"
          onPress={handleSubmit(handleNextStep)}
        />
      </ScrollView>
    </VStack>
  );
}
