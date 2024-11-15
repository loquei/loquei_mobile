import { CalendarComponent } from '@components/Calendar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Button } from '@components/Button';
import { VStack } from '@gluestack-ui/themed';
import { postRental } from '../api/postRental';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { ScreenHeader } from '@components/ScreenHeader';
import { ScrollView } from 'react-native';

export function Calendar() {
  const route = useRoute();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { itemId, lessorId, lesseeId, minDays, maxDays, filteredRentals } = route.params as {
    itemId: string;
    lessorId: string;
    lesseeId: string;
    minDays: number;
    maxDays: number;
    filteredRentals: any[];
  };

  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  console.log('Dados do aluguel de produto:', itemId, lessorId, lesseeId, minDays, maxDays, filteredRentals);

  const handleCreateRental = async () => {
    try {
      setIsLoading(true);

      if (!startDate || !endDate) {
        alert("Por favor, selecione um intervalo de datas.");
        return;
      }

      console.log('Data de início:', startDate);
      console.log('Data de fim:', endDate);

      console.log('DADOS DO ALUGUEL', itemId, lessorId, lesseeId, startDate, endDate);
      await postRental(lessorId, lesseeId, itemId, startDate, endDate);

      navigation.navigate('productDetails', { id: itemId });
    } catch (error) {
      console.error('Erro ao criar aluguel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  function clearDates() {
    setStartDate(null);
    setEndDate(null);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
      <ScreenHeader title="Calendário" backButton />
      <CalendarComponent
        minDays={minDays}
        maxDays={maxDays}
        rentalDates={filteredRentals}
        onSelectDate={(start: Date, end: Date) => {
          setStartDate(start);
          setEndDate(end);
        }}
        clearDates={clearDates}
      />
      <VStack px={16} py={8}>
        <Button
          title={isLoading ? "Alugando..." : "Alugar"}
          onPress={handleCreateRental}
          disabled={isLoading || !startDate || !endDate}
          buttonVariant={isLoading || !startDate || !endDate ? "outline" : "solid"}
        />
      </VStack>
    </ScrollView>
  );
}
