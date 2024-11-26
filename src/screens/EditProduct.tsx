import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { Select } from "@components/Select";
import { Textarea } from "@components/Textarea";
import { HStack } from "@gluestack-ui/themed";
import { VStack, Text } from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as y from "yup";
import { PostItemSchema } from "../schemas/CreateItemSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ListCategories } from "../api/listCategory";
import { ICategories } from "../@types/TCategories";
import { TextInputMask } from "react-native-masked-text";
import { Save } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { putItem } from "../api/putItem";
import { GetItem } from "../api/getItem";
import { Loading } from "@components/Loading";

export function EditProduct() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  type CreateItemSchema = y.InferType<typeof PostItemSchema>;
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [product, setProduct] = useState<CreateItemSchema>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { tokens } = gluestackUIConfig;

  const route = useRoute();
  const { id } = route.params as { id: string };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateItemSchema>({
    resolver: yupResolver(PostItemSchema),
    defaultValues: {
      name: "",
      description: "",
      categories: selectedCategoryId ? [selectedCategoryId] : [],
      min_days: 0,
      max_days: 0,
      daily_value: 0,
    },
  });

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const currentUser = await AsyncStorage.getItem("currentUser");
          if (currentUser) {
            const parsedUser = JSON.parse(currentUser);
            setUserId(parsedUser.items[0].id);
          }
        } catch (error) {
          console.error("Erro ao buscar o ID do usuário:", error);
        }
      };

      const fetchCategories = async () => {
        try {
          const listCategories = await ListCategories();
          setCategories(listCategories);
        } catch (error) {
          console.error("Erro ao buscar categorias:", error);
        }
      };

      const fetchProduct = async () => {
        setIsLoading(true);
        if (!id) {
          return;
        }

        console.log("Buscando produto com id:", id);

        try {
          const item = await GetItem(id);
          setProduct(item);

          const selectedCategoryId = item.categories_ids[0];
          setSelectedCategoryId(selectedCategoryId);

          reset({
            name: item.name,
            description: item.description,
            min_days: item.min_days,
            max_days: item.max_days,
            daily_value: item.daily_value,
            categories: [selectedCategoryId],
          });
        } catch (error) {
          console.error("Erro ao buscar o produto:", error);
        }
      };

      fetchData();
      fetchCategories();
      fetchProduct();
      setIsLoading(false);
    }, [id, reset])
  );

  const handleEditProduct = async (data: CreateItemSchema) => {
    const newData = {
      ...data,
      user_id: userId,
      categories: selectedCategoryId ? [selectedCategoryId] : [],
      daily_value: parseFloat(
        data.daily_value.toString().replace(/[^\d.-]/g, "")
      ),
    };

    try {
      await putItem(id, newData);
      navigation.navigate("dashboard");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const filteredCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  if (isLoading) {
    return <Loading />;
  }

  const handleChangeCategoryValueId = (id: string) => {
    setSelectedCategoryId(id);
  };

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
            render={({ field: { value, onBlur, onChange } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value?.toString()}
                placeholder="Ex: Ferramenta de jardinagem"
                errorMessage={errors.name?.message}
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
                errorMessage={errors.description?.message}
              />
            )}
          />
        </VStack>

        <VStack>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
            Categoria
          </Text>
          <Controller
            name="categories"
            control={control}
            render={({ field: { onChange } }) => (
              <Select
                placeholder="Selecione a categoria"
                options={filteredCategories}
                value={
                  categories.find(
                    (category) => category.id === selectedCategoryId
                  )?.name || ""
                }
                handleChangeCategoryValueId={(id) => {
                  const newValue = [id];
                  onChange(newValue);
                  handleChangeCategoryValueId(id);
                }}
                errorMessage={errors.categories?.message}
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
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  placeholder="mínimo"
                  keyboardType="numeric"
                  value={value?.toString()}
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
                  errorMessage={errors.min_days?.message}
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
                  onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
                  errorMessage={errors.max_days?.message}
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
                <TextInputMask
                  type={"money"}
                  options={{
                    precision: 2,
                    separator: ".",
                    delimiter: ",",
                    unit: "R$",
                    suffixUnit: "",
                  }}
                  value={(value * 100)?.toString()}
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    const cleanValue = text.replace(/[^\d.-]/g, "");
                    onChange(cleanValue);
                  }}
                  customTextInput={Input}
                  customTextInputProps={{
                    placeholder: "Digite o valor da diária",
                    errorMessage: errors.daily_value?.message,
                  }}
                />
              )}
            />
          </VStack>
        </VStack>

        <HStack mt={16} gap={8} justifyContent="center">
          <Button
            title="Cancelar"
            buttonVariant="outline"
            onPress={() => navigation.goBack()}
            width="50%"
          />
          <Button
            icon={<Save size={24} color={tokens.colors.white} />}
            title="Salvar"
            onPress={handleSubmit(handleEditProduct)}
            width="50%"
          />
        </HStack>
      </ScrollView>
    </VStack>
  );
}
