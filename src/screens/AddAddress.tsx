import { ScreenHeader } from "@components/ScreenHeader";
import { Input } from "@components/Input";
import {
  VStack,
  Text,
  ScrollView,
  Center,
  RadioGroup,
  RadioIndicator,
  RadioIcon,
  CircleIcon,
  RadioLabel,
} from "@gluestack-ui/themed";
import { Button } from "@components/Button";
import { Controller, useForm } from "react-hook-form";
import * as y from "yup";
import { createAddressSchema } from "../schemas/CreateAddressSchema";
import MaskInput from "react-native-mask-input";
import { Radio } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { postAddress } from "../api/postAddress";

const zipCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
export function AddAddress() {
  type createAddress = y.InferType<typeof createAddressSchema>;
  const [userId, setUserId] = useState("");
  useEffect(() => {
    setUserId("5e16501c0e964d379729adb6293a1697");
  }, []);

  const { control, handleSubmit } = useForm<createAddress>({
    defaultValues: {
      postal_code: "",
      city: "",
      neighborhood: "",
      street: "",
      number: 0,
      state: "",
      country: "Brasil",
      main: false,
      user_id: userId,
    },
  });

  const handlePostAddress = async (data: createAddress) => {
    try {
      const {
        postal_code,
        city,
        neighborhood,
        street,
        number,
        state,
        country,
        main,
        user_id,
      } = data;
      const removeMask = (maskedValue: string) => {
        return maskedValue.replace(/\D/g, "");
      };
      const codeNomask = removeMask(postal_code);
      await postAddress({
        postal_code: codeNomask,
        city,
        neighborhood,
        street,
        number,
        state,
        country,
        main,
        user_id: userId,
      });
    } catch {}
  };

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
                    placeholder="Sigla do Estado"
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
                País
              </Text>
              <Controller
                control={control}
                name="country"
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    placeholder="País"
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
                name="main"
                rules={{ required: true, maxLength: 14 }}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    onChange={(newValue) => onChange(newValue === "true")}
                    value={value ? "true" : "false"}
                  >
                    <Radio value="true" mb={8} size="md">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel p={8}>Sim</RadioLabel>
                    </Radio>

                    <Radio value="" mb={16} size="md">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel p={8}>Não</RadioLabel>
                    </Radio>
                  </RadioGroup>
                )}
              />
            </VStack>
            <Button
              title="Cadastrar"
              onPress={handleSubmit(handlePostAddress)}
            />
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  );
}
