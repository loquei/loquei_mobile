import React from 'react';
import { ScreenHeader } from '@components/ScreenHeader';
import { VStack, Text, Divider } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';

export function About() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      <ScreenHeader title="Sobre a Loquei" backButton />

      <VStack my={16} gap="$3">
        <Text px={16} fontSize="$xl" fontWeight="$bold" color="$black" fontFamily="$heading">
          Sobre a Loquei
        </Text>
        <Text px={16} fontSize="$md" color="$gray600" fontFamily="$body">
          Conheça nossa missão, nossa história e como funcionamos para oferecer a você uma experiência de aluguel colaborativa e segura.
        </Text>

        <Divider />

        <VStack px={16} gap="$6">
          <VStack>
            <Text fontSize="$lg" fontWeight="$medium" color="$black" fontFamily="$heading">
              Nossa Missão
            </Text>
            <Text fontSize="$sm" color="$gray600" fontFamily="$body">
              Facilitar o compartilhamento e aluguel de produtos, promovendo a economia colaborativa e um consumo mais consciente.
            </Text>
          </VStack>

          <Divider />

          <VStack>
            <Text fontSize="$lg" fontWeight="$medium" color="$black" fontFamily="$heading">
              Nossa História
            </Text>
            <Text fontSize="$sm" color="$gray600" fontFamily="$body">
              Fundada com o objetivo de aproximar pessoas e tornar o acesso a produtos mais acessível e sustentável.
            </Text>
          </VStack>

          <Divider />

          <VStack>
            <Text fontSize="$lg" fontWeight="$medium" color="$black" fontFamily="$heading">
              Como Funciona
            </Text>
            <Text fontSize="$sm" color="$gray600" fontFamily="$body">
              Encontre produtos para alugar, entre em contato com o proprietário e faça o aluguel com segurança.
            </Text>
          </VStack>

          <Divider />

          <VStack>
            <Text fontSize="$lg" fontWeight="$medium" color="$black" fontFamily="$heading">
              Versão do Aplicativo
            </Text>
            <Text fontSize="$sm" color="$gray600" fontFamily="$body">
              2.0.0
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
