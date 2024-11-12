import React, { useState } from "react";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { ptBR } from "@utils/localeCalendar";
import { Box, Text, Button, VStack } from "@gluestack-ui/themed";
import { gluestackUIConfig } from '../../config/gluestack-ui.config';
import { Button as StyledButton } from '@components/Button';
import { format } from 'date-fns';
import { ptBR as ptBRLocale } from 'date-fns/locale';
import Toast from 'react-native-toast-message';

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

interface CalendarComponentProps {
  minDays: number;
  maxDays: number;
  rentalDates: Array<{
    id: string;
    item: string;
    lessee: string;
    lessor: string;
    start_date: string;
    end_date: string;
    status: string;
    total_value: number;
  }>;
  onSelectDate: (start: Date, end: Date) => void;
  clearDates?: () => void;
}

export function CalendarComponent({ minDays, maxDays, rentalDates, onSelectDate, clearDates }: CalendarComponentProps) {
  const [startDate, setStartDate] = useState<DateData | null>(null);
  const [endDate, setEndDate] = useState<DateData | null>(null);
  const { tokens } = gluestackUIConfig;

  const adjustToBrazilianTimeZone = (date: Date) => {
    const timeZoneOffset = -3 * 60;
    const adjustedDate = new Date(date.getTime() + (timeZoneOffset + date.getTimezoneOffset()) * 60000);
    adjustedDate.setHours(0, 0, 0, 0);
    return adjustedDate;
  };

  const today = adjustToBrazilianTimeZone(new Date());
  const todayString = today.toISOString().split("T")[0];

  const getAllDaysInRange = (start: string, end: string) => {
    const dateArray = [];
    let currentDate = new Date(start);

    while (currentDate <= new Date(end)) {
      dateArray.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  };

  const isDateDisabled = (dateString: string) => {
    return rentalDates.some(rental => {
      const rentalDays = getAllDaysInRange(rental.start_date, rental.end_date); // Atualizado para start_date e end_date
      return rentalDays.includes(dateString);
    });
  };

  const isConflictingDateRange = (selectedDays: string[]) => {
    return selectedDays.some(date => isDateDisabled(date));
  };

  const handleDayPress = (date: DateData) => {
    const selectedDate = new Date(date.dateString);
    const today = new Date(todayString);

    if (selectedDate <= today) {
      showToast(
        'error',
        'Data inválida',
        'Selecione uma data posterior a hoje.',
      );
      return;
    }

    if (isDateDisabled(date.dateString)) {
      showToast(
        'error',
        'Data inválida',
        'Esta data não está disponível para aluguel.',
      );
      return;
    }

    if (!startDate) {
      setStartDate(date);
    } else if (!endDate) {
      const selectedStart = new Date(startDate.dateString) < new Date(date.dateString) ? startDate : date;
      const selectedEnd = new Date(startDate.dateString) < new Date(date.dateString) ? date : startDate;

      const selectedDays = getAllDaysInRange(selectedStart.dateString, selectedEnd.dateString);

      if (isConflictingDateRange(selectedDays)) {
        setStartDate(null);
        setEndDate(null);
        showToast(
          'error',
          'Intervalo de datas inválido',
          'Este intervalo de datas não está disponível para aluguel.',
        );
      } else {
        const daysSelected = selectedDays.length;

        if (daysSelected - 1 < minDays) {
          showToast(
            'error',
            'Intervalo de datas inválido',
            `Este produto requer um aluguel com no mínimo ${minDays} dias.`,
          );
          return;
        }

        if (daysSelected - 1 > maxDays) {
          showToast(
            'error',
            'Intervalo de datas inválido',
            `Este produto requer um aluguel com no máximo ${maxDays} dias.`,
          );
          return;
        }

        setStartDate(selectedStart);
        setEndDate(selectedEnd);

        onSelectDate(new Date(selectedStart.dateString), new Date(selectedEnd.dateString));
      }
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    clearDates && clearDates();
  };

  const getMarkedDates = () => {
    const markedDates: Record<string, { marked?: boolean; color?: string; selected?: boolean; startingDay?: boolean; endingDay?: boolean }> = {};

    rentalDates.forEach(rental => {
      getAllDaysInRange(rental.start_date, rental.end_date).forEach(day => {
        markedDates[day] = { color: tokens.colors.red300, marked: true };
      });
    });

    if (startDate && endDate) {
      const start = new Date(startDate.dateString);
      const end = new Date(endDate.dateString);

      getAllDaysInRange(startDate.dateString, endDate.dateString).forEach((day, index, array) => {
        if (day === array[0]) {
          markedDates[day] = {
            selected: true,
            color: tokens.colors.teal200,
            startingDay: true,
          };
        } else if (day === array[array.length - 1]) {
          markedDates[day] = {
            selected: true,
            color: tokens.colors.teal200,
            endingDay: true,
          };
        } else {
          markedDates[day] = {
            selected: true,
            color: tokens.colors.yellow300,
          };
        }
      });
    } else if (startDate) {
      markedDates[startDate.dateString] = { selected: true, color: tokens.colors.teal200 };
    }

    return markedDates;
  };

  const showToast = (type: 'error' | 'info' | 'success', title: string, description: string) => {
    Toast.show({
      type,
      text1: title,
      text2: description,
    });
  }

  return (
    <Box flex={1} backgroundColor={tokens.colors.backgroundLight50}>
      <Calendar
        renderArrow={(direction: "right" | "left") => (
          <Feather size={24} color={tokens.colors.textLight600} name={`chevron-${direction}`} />
        )}
        headerStyle={{
          borderBottomWidth: 0.5,
          borderBottomColor: tokens.colors.secondary100,
        }}
        theme={{
          textMonthFontSize: 18,
          monthTextColor: tokens.colors.textDark800,
          selectedDayBackgroundColor: tokens.colors.teal600,
          selectedDayTextColor: tokens.colors.white,
          arrowColor: tokens.colors.textLight600,
          calendarBackground: tokens.colors.backgroundLight50,
          textDayStyle: { color: tokens.colors.textDark800 },
          textDisabledColor: tokens.colors.secondary100,
        }}
        minDate={todayString}
        disableMonthNavigation={true}
        hideExtraDays
        onDayPress={handleDayPress}
        markedDates={getMarkedDates()}
        dayComponent={({ date, state }: { date: DateData; state: DayState }) => (
          <Button
            variant="solid"
            onPress={() => handleDayPress(date)}
            px={2}
            py={1}
            style={[
              {
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 7,
                backgroundColor:
                  date.dateString === startDate?.dateString || date.dateString === endDate?.dateString
                    ? tokens.colors.teal600
                    : startDate && endDate && new Date(date.dateString) > new Date(startDate.dateString) && new Date(date.dateString) < new Date(endDate.dateString)
                      ? tokens.colors.green100
                      : (isDateDisabled(date.dateString) || (date.dateString === todayString && isDateDisabled(todayString)))
                        ? tokens.colors.red300
                        : tokens.colors.secondary100
              },
              state === "disabled" ? { opacity: 0.3 } : {},
            ]}
          >
            <Text
              style={[
                { color: tokens.colors.textDark800, fontWeight: "bold" },
                state === "disabled" ? { color: tokens.colors.textDark800 } : {},
                date.dateString === todayString && isDateDisabled(todayString)
                  ? { color: tokens.colors.textDark800 }
                  : date.dateString === todayString
                    ? { color: tokens.colors.teal600 }
                    : {},
                (date.dateString === startDate?.dateString || date.dateString === endDate?.dateString) && { color: tokens.colors.white },
              ]}
            >
              {date.day}
            </Text>
          </Button>
        )}
      />

      <Toast />

      <Box px={16} mt={16}>
        {!startDate && !endDate && (
          <Text fontFamily="$body" fontSize="$md" color="$textDark800" mt={2} textAlign="center">
            Selecione um intervalo de datas para alugar o produto.
          </Text>
        )}

        {startDate && (
          <Text fontFamily="$heading" fontSize="$md" color="$textDark800">
            Data de início: {format(new Date(startDate.dateString), 'dd/MM/yyyy', { locale: ptBRLocale })}
          </Text>
        )}

        {endDate && (
          <Text fontFamily="$heading" fontSize="$md" color="$textDark800" mt={2}>
            Data de término: {format(new Date(endDate.dateString), 'dd/MM/yyyy', { locale: ptBRLocale })}
          </Text>
        )}
      </Box>

      {
        (startDate || endDate) && (
          <Box flex={1} px={16}>
            <VStack flex={1} />
            <StyledButton
              title="Limpar seleção"
              onPress={clearSelection}
              buttonVariant="danger-outline"
              alignSelf="flex-end"
            />
          </Box>
        )
      }

    </Box>
  );
}
