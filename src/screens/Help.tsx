import React from 'react';
import { ScreenHeader } from '@components/ScreenHeader';
import { VStack, Text, Divider } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import accordionData, { DetailsAccordion } from '@components/DetailsAccordion';

export function Help() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      <ScreenHeader title="Ajuda" backButton />

      <VStack mt={16} gap="$3">
        <Text px={16} fontSize="$xl" fontWeight="$bold" color="$textDark800" fontFamily="$heading">
          Central de Ajuda
        </Text>
        <Text px={16} fontSize="$md" color="$gray600" fontFamily="$body">
          Encontre aqui suporte e respostas rápidas para usar o app com segurança e facilidade.
        </Text>

        <Divider />

        <VStack mb={16} gap="$6">
          <VStack>
            <Text px={16} fontSize="$lg" fontWeight="$medium" color="$textDark800" fontFamily="$heading">
              Perguntas Frequentes
            </Text>
            <Text px={16} fontSize="$sm" color="$gray600" fontFamily="$body">
              Dúvidas comuns sobre o funcionamento do aplicativo e políticas.
            </Text>

            <DetailsAccordion type='helpScreen' items={accordionData.helpScreen} />
          </VStack>

          <Divider />

          <VStack px={16}>
            <Text fontSize="$lg" fontWeight="$medium" color="$textDark800" fontFamily="$heading">
              Feedback do Usuário
            </Text>
            <Text fontSize="$sm" color="$gray600" fontFamily="$body">
              A sua opinião é essencial para melhorias contínuas. Compartilhe seu feedback!
            </Text>
          </VStack>

          <Divider />

          <VStack>
            <Text px={16} fontSize="$lg" fontWeight="$medium" color="$textDark800" fontFamily="$heading">
              Fale Conosco
            </Text>
            <Text px={16} fontSize="$sm" color="$gray600" fontFamily="$body">
              Precisa de ajuda? Entre em contato pelo e-mail:
            </Text>
            <Text px={16} fontSize="$md" color="$gray600" fontFamily="$mono">loquei.project@gmail.com</Text>
          </VStack>

        </VStack>
      </VStack>
    </ScrollView>
  );
}
