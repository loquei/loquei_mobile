import { Button } from "@components/Button";
import { ItemCard } from "@components/ItemCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { VStack, Text, HStack, Divider, View, Pressable } from "@gluestack-ui/themed";
import { useState } from "react";

export function OrderDetails() {
  const [orderAccepted, setOrderAccepted] = useState<boolean | undefined>(undefined);

  function handleOrderAccept() {
    setOrderAccepted(true);
  }

  function handleOrderReject() {
    setOrderAccepted(false);
  }

  return (
    <VStack>
      <ScreenHeader title="Detalhes do pedido" backButton />

      <VStack px={16} mt={16}>
        <Text fontFamily="$heading" fontSize="$2xl" color="$textDark800">
          Detalhes do pedido
        </Text>

        <HStack justifyContent="space-between" py={16}>
          <Text fontFamily="$heading" fontSize="$md" color="$textDark800">
            ID do pedido
          </Text>
          <Text fontFamily="$body" fontSize="$md" color="$textDark800">
            #12345
          </Text>
        </HStack>
        <Divider />

        <HStack justifyContent="space-between" py={16}>
          <Text fontFamily="$heading" fontSize="$md" color="$textDark800">
            Cliente
          </Text>
          <Text fontFamily="$body" fontSize="$md" color="$textDark800">
            John Doe
          </Text>
        </HStack>
        <Divider />

        <HStack justifyContent="space-between" py={16}>
          <Text fontFamily="$heading" fontSize="$md" color="$textDark800">
            Data
          </Text>
          <Text fontFamily="$body" fontSize="$md" color="$textDark800">
            12/08/2024
          </Text>
        </HStack>
        <Divider />

        <HStack justifyContent="space-between" py={16}>
          <Text fontFamily="$heading" fontSize="$md" color="$textDark800">
            Status
          </Text>
          <Text fontFamily="$body" fontSize="$md" color="$textDark800">
            {orderAccepted === undefined ? 'Pendente' : orderAccepted ? 'Aceito' : 'Recusado'}
          </Text>
        </HStack>
        <Divider />

        <VStack py={16}>
          <Text fontFamily="$heading" fontSize="$lg" color="$textDark800" mb={8}>
            Produto
          </Text>

          <ItemCard
            type="product"
            title="Nome do produto"
            description="Descrição do produto"
            price="R$ 3.999,00"
          />
        </VStack>

        {orderAccepted === undefined && (
          <HStack justifyContent="space-between" py={16} gap={8}>
            <Button title="Recusar pedido" buttonVariant="danger-outline" flex={1} onPress={handleOrderReject} />
            <Button title="Aceitar pedido" flex={1} onPress={handleOrderAccept} />
          </HStack>
        )}

        {orderAccepted === true && (
          <VStack>
            <Text fontFamily="$heading" fontSize="$lg" color="$textDark800" mb={8}>
              Conversar com o cliente
            </Text>

            <HStack bg="$white" p={16} rounded={"$md"} alignItems="center" justifyContent="space-between">
              <HStack alignItems="center" gap={16}>
                <View width={48} height={48} bg="$backgroundLight100" rounded={"$full"} justifyContent="center" alignItems="center" />
                <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                  John Doe
                </Text>
              </HStack>

              <Pressable px={16} py={8} bg="$green100" rounded={"$md"} $active-bg="$green200">
                <Text fontFamily="$mono" fontSize="$md" color="$teal600">
                  Conversar
                </Text>
              </Pressable>
            </HStack>
          </VStack>
        )}

        {orderAccepted === false && (
          <Text fontFamily="$body" fontSize="$md" color="$red500" mt={16} textAlign="center">
            Pedido recusado.
          </Text>
        )}
      </VStack>

      <Pressable onPress={() => setOrderAccepted(undefined)}>
        <Text fontFamily="$body" fontSize="$md" color="$teal600" textAlign="center">
          Voltar estado do pedido
        </Text>
      </Pressable>
    </VStack>
  );
}