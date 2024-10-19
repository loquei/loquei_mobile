import { ScreenHeader } from "@components/ScreenHeader";
import { Input } from "@components/Input";
import {
  VStack,
  Text,
  Pressable,
  ScrollView,
  Center,
  RadioGroup,
  RadioIndicator,
  RadioIcon,
  CircleIcon,
  RadioLabel,
  Box,
} from "@gluestack-ui/themed";
import { Button } from "@components/Button";
import { Controller, useForm } from "react-hook-form";
import * as y from "yup";
import { createAddressSchema } from "../schemas/CreateAddressSchema";
import MaskInput from "react-native-mask-input";
import { Radio } from "@gluestack-ui/themed";

const zipCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
export function AddAddress() {
  type createAddress = y.InferType<typeof createAddressSchema>;

  const { control, handleSubmit } = useForm<createAddress>();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <ScreenHeader title="Cadastro" backButton />
      <VStack flex={1} px={16} py={40}>
        <Center flex={1}>
          <VStack w="$full">
            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                CEP
              </Text>

              <Controller
                control={control}
                name="postal_code"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MaskInput
                    placeholder="CEP"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    mask={zipCodeMask}
                  />
                )}
              />
            </VStack>

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                Cidade
              </Text>

              <Controller
                control={control}
                name="city"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Cidade"
                    type="text"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </VStack>

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                Bairro
              </Text>

              <Controller
                control={control}
                name="neighborhood"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Bairro"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </VStack>

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                Rua
              </Text>
              <Controller
                control={control}
                name="street"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Rua"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </VStack>
            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                Numero
              </Text>
              <Controller
                control={control}
                name="number"
                rules={{ required: true, maxLength: 14 }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    placeholder="Numero"
                    keyboardType="phone-pad"
                    maxLength={14}
                    onBlur={onBlur}
                    value={value?.toString()}
                    onChangeText={onChange}
                  />
                )}
              />
            </VStack>

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                Estado
              </Text>
              <Controller
                control={control}
                name="state"
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    placeholder="Estado"
                    keyboardType="default"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </VStack>
            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                Definir como endereço principal:
              </Text>
              <Controller
                control={control}
                name="number"
                rules={{ required: true, maxLength: 14 }}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup value={value?.toString()}>
                    <Radio value="sim" mb={8} size="md">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel p={8}>Sim</RadioLabel>
                    </Radio>

                    <Radio value="nao" mb={16} size="md">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel p={8}>Não</RadioLabel>
                    </Radio>
                  </RadioGroup>
                )}
              />
            </VStack>
            <Button title="Cadastrar" />
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  );
}
