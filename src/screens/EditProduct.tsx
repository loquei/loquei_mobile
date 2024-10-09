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
import { Divider } from "@gluestack-ui/config/build/theme";

import { Save } from 'lucide-react-native'
import { gluestackUIConfig } from "@gluestack-ui/config";

export function EditProduct() {
  const { tokens } = gluestackUIConfig

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  type CreateItemSchema = y.InferType<typeof PostItemSchema>;

  const { control, handleSubmit } = useForm<CreateItemSchema>({
    defaultValues: {
      name: "Iphone 12",
      description: "Iphone 12 128gb preto",

      daily_value: 100,
      max_days: 30,
      min_days: 7,
      categories_id: [],
    },
  });

  function handleNavigateToUserProducts() {
    navigation.navigate("userProducts");
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Editar Produto" backButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          marginTop: 16,
        }}
      >
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
                value={"Eletrônicos"}
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
            Por quanto tempo você deseja alugar (dias):
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
                  value={value ? String(value) : ''}
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(text ? parseInt(text, 10) : '')}
                />
              )}
            />
            <Controller
              name="max_days"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  placeholder="máximo"
                  keyboardType="numeric"
                  value={value ? String(value) : ''}
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(text ? parseInt(text, 10) : '')}
                />
              )}
            />
          </HStack>
        </VStack>

        <VStack mt={16} gap={8}>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
            Preço da diária
          </Text>
          <Controller
            name="daily_value"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onBlur, onChange } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value ? String(value) : ''}
                placeholder="Ex: R$50,00"
              />
            )}
          />
        </VStack>

        <HStack mt={16} gap={8} justifyContent="center">
          <Button
            title="Cancelar"
            buttonVariant="outline"
            onPress={() => navigation.goBack()}
            flex={1}
          />
          <Button
            icon={
              <Save size={24} color={
                tokens.colors.white
              } />
            }
            title="Salvar"
            flex={1}
            onPress={handleNavigateToUserProducts}
          />
        </HStack>
      </ScrollView>
    </VStack>
  );
}
