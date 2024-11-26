import { Button } from "@components/Button";
import { ItemCard } from "@components/ItemCard";
import { ScreenHeader } from "@components/ScreenHeader";
import {
  VStack,
  Text,
  HStack,
  Divider,
  View,
  Pressable,
} from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useState, useCallback, useEffect } from "react";
import { getRental } from "../api/getRental";
import { GetItem } from "../api/getItem";
import { IGetItem } from "../@types/TItem";
import { getUser } from "../api/getUser";
import { getLessee } from "../api/getLessee";
import { Loading } from "@components/Loading";
import { Linking, ScrollView } from "react-native";
import { acceptRental } from "../api/putAcceptRental";
import { refuseRental } from "../api/putRefuseRental";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface IRentalDetails {
  created_at: string;
  end_date: string;
  id: string;
  item: string;
  lessee: string;
  lessor: string;
  start_date: string;
  status:
    | "PENDING"
    | "ACCEPTED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED"
    | "REFUSED";
  total_value: number;
  updated_at: string;
}

interface IGetUser {
  id: string;
  user_name: string;
  personal_name: string;
  email: string;
  phone: string;
  document: string;
  birth: string;
  created_at: string;
  updated_at: string;
}

export function OrderDetails() {
  const [rentalDetails, setRentalDetails] = useState<IRentalDetails | null>(
    null
  );
  const [itemDetails, setItemDetails] = useState<IGetItem | null>(null);
  const [lesseeDetails, setLesseeDetails] = useState<IGetUser | null>(null);

  const route = useRoute();
  const { id } = route.params as { id: string };

  const {
    data: rentals,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [`rentals/${id}`],
    queryFn: () => getRental(id),
  });

  useEffect(() => {
    if (rentals) {
      setRentalDetails(rentals);
    }
  }, [rentals]);

  const fetchRental = async () => {
    try {
      const rentalResponse = await getRental(id);
      if (rentalResponse) {
        console.log("Rental details:", rentalResponse);
        setRentalDetails(rentalResponse);
      }
    } catch (error) {
      console.error("Erro ao buscar os detalhes do aluguel:", error);
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pendente";
      case "ACCEPTED":
        return "Aceita";
      case "REFUSED":
        return "Recusada";
      case "CANCELED":
        return "Cancelada";
      case "COMPLETED":
        return "Concluída";
      case "IN_PROGRESS":
        return "Em andamento";
      default:
        return "Status desconhecido";
    }
  };

  async function handleOrderAccept() {
    const acceptResponse = await acceptRental(id);

    if (acceptResponse) {
      await fetchRental();
    }
  }

  async function handleOrderRefuse() {
    const refuseResponse = await refuseRental(id);

    if (refuseResponse) {
      await fetchRental();
    }
  }

  function handleLessorToLesseeChat() {
    const phoneNumber = lesseeDetails?.phone;
    if (phoneNumber) {
      Linking.openURL(`https://wa.me/${phoneNumber}`).catch((err) =>
        console.error("Erro ao abrir URL:", err)
      );
    } else {
      console.error("Número de telefone não disponível");
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchRental();
    }, [id, rentals])
  );

  useEffect(() => {
    const fetchItem = async (itemId: string) => {
      console.log("Buscando detalhes do item:", itemId);
      try {
        const itemResponse = await GetItem(itemId);
        if (itemResponse) {
          console.log("Item details:", itemResponse);
          setItemDetails(itemResponse);
        }
      } catch (error) {
        console.error("Erro ao buscar os detalhes do item:", error);
      }
    };

    const fetchLessee = async (lesseeId: string) => {
      try {
        const lesseeResponse = await getLessee(lesseeId);
        if (lesseeResponse) {
          console.log("Lessee details:", lesseeResponse);
          setLesseeDetails(lesseeResponse);
        }
      } catch (error) {
        console.error("Erro ao buscar os detalhes do locatário:", error);
      }
    };

    if (rentalDetails) {
      fetchItem(rentalDetails.item);

      if (rentalDetails.lessee) {
        fetchLessee(rentalDetails.lessee);
      }
    }
  }, [rentalDetails]);

  if (!rentalDetails || !itemDetails) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      <ScreenHeader title="Detalhes do pedido" backButton />

      <VStack px={16} mt={16}>
        <Text fontFamily="$heading" fontSize="$2xl" color="$textDark800">
          Detalhes do pedido
        </Text>

        <VStack justifyContent="space-between" py={16}>
          <Text fontFamily="$heading" fontSize="$md" color="$textDark800">
            ID do pedido
          </Text>
          <Text fontFamily="$body" fontSize="$md" color="$textDark800">
            #{id}
          </Text>
        </VStack>
        <Divider />

        <VStack justifyContent="space-between" py={16}>
          <Text fontFamily="$heading" fontSize="$md" color="$textDark800">
            Cliente
          </Text>
          <Text fontFamily="$body" fontSize="$md" color="$textDark800">
            {lesseeDetails?.personal_name}
          </Text>
        </VStack>
        <Divider />

        <VStack justifyContent="space-between" py={16}>
          <Text fontFamily="$heading" fontSize="$md" color="$textDark800">
            Data
          </Text>
          <Text fontFamily="$body" fontSize="$md" color="$textDark800">
            {format(new Date(rentalDetails.start_date), "dd/MM/yyyy")}
          </Text>
        </VStack>
        <Divider />

        <VStack justifyContent="space-between" py={16}>
          <Text fontFamily="$heading" fontSize="$md" color="$textDark800">
            Status
          </Text>
          <Text fontFamily="$body" fontSize="$md" color="$textDark800">
            {getStatusDescription(rentalDetails.status)}
          </Text>
        </VStack>
        <Divider />

        <VStack py={16}>
          <Text
            fontFamily="$heading"
            fontSize="$lg"
            color="$textDark800"
            mb={8}
          >
            Produto
          </Text>

          {itemDetails && (
            <ItemCard
              id={rentalDetails.item}
              date={format(new Date(rentalDetails.start_date), "dd/MM/yyyy")}
              imagesPaths={
                itemDetails.images.links.length > 0
                  ? itemDetails.images.links
                  : ["https://via.placeholder.com/150"]
              }
              type="product"
              title={itemDetails.name}
              description={itemDetails.description}
              price={
                rentalDetails.total_value
                  ? rentalDetails.total_value.toFixed(2).replace(".", ",")
                  : "0"
              }
            />
          )}
        </VStack>

        {rentalDetails.status === "PENDING" && (
          <HStack justifyContent="space-between" py={16} gap={8}>
            <Button
              title="Recusar pedido"
              buttonVariant="danger-outline"
              flex={1}
              onPress={handleOrderRefuse}
            />
            <Button
              title="Aceitar pedido"
              flex={1}
              onPress={handleOrderAccept}
            />
          </HStack>
        )}

        {rentalDetails.status === "ACCEPTED" && (
          <VStack>
            <Text
              fontFamily="$heading"
              fontSize="$lg"
              color="$textDark800"
              mb={8}
            >
              Conversar com o cliente
            </Text>

            <HStack
              borderWidth={1}
              borderColor={"$secondary100"}
              bg="$white"
              p={16}
              rounded={"$md"}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack alignItems="center" gap={16}>
                <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                  {lesseeDetails?.personal_name}
                </Text>
              </HStack>

              <Pressable
                px={16}
                py={8}
                bg="$green100"
                rounded={"$md"}
                $active-bg="$green200"
              >
                <Text
                  fontFamily="$mono"
                  fontSize="$md"
                  color="$teal600"
                  onPress={handleLessorToLesseeChat}
                >
                  Conversar
                </Text>
              </Pressable>
            </HStack>
          </VStack>
        )}

        {rentalDetails.status === "REFUSED" && (
          <Text
            fontFamily="$body"
            fontSize="$md"
            color="$red500"
            mt={16}
            textAlign="center"
          >
            Pedido recusado.
          </Text>
        )}
      </VStack>
    </ScrollView>
  );
}
