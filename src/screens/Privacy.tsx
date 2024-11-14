import React from 'react';
import { ScreenHeader } from '@components/ScreenHeader';
import { VStack, HStack, Text, Divider } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';

export function Privacy() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      <ScreenHeader title="Política de privacidade" backButton />

      <VStack mt={16} gap="$3">
        <Text px={16} fontSize="$xl" fontWeight="$bold" color="$black" fontFamily="$heading">
          Nossa Política de Privacidade
        </Text>
        <Text px={16} fontSize="$md" color="$gray600" fontFamily="$body">
          Estamos comprometidos com a proteção dos seus dados e a sua privacidade. Aqui, explicamos como coletamos, usamos e compartilhamos suas informações.
        </Text>

        <Divider />

        <VStack px={16} gap="$6">
          <VStack>
            <Text fontSize="$lg" fontWeight="$medium" color="$black" fontFamily="$heading">
              Coleta de Dados
            </Text>
            <Text fontSize="$sm" color="$gray600" fontFamily="$body">
              Coletamos informações que você nos fornece diretamente e dados gerados automaticamente para melhorar nossos serviços.
            </Text>
          </VStack>

          <Divider />

          <VStack>
            <Text fontSize="$lg" fontWeight="$medium" color="$black" fontFamily="$heading">
              Uso de Informações
            </Text>
            <Text fontSize="$sm" color="$gray600" fontFamily="$body">
              Usamos suas informações para fornecer, personalizar e melhorar nossos serviços, além de garantir a segurança dos usuários.
            </Text>
          </VStack>

          <Divider />

          <VStack>
            <Text fontSize="$lg" fontWeight="$medium" color="$black" fontFamily="$heading">
              Compartilhamento de Dados
            </Text>
            <Text fontSize="$sm" color="$gray600" fontFamily="$body">
              Seus dados são compartilhados apenas com parceiros confiáveis e sempre respeitando sua privacidade.
            </Text>
          </VStack>

          <Divider />

          <VStack>
            <Text fontSize="$lg" fontWeight="$medium" color="$black" fontFamily="$heading">
              Seus Direitos
            </Text>
            <Text fontSize="$sm" color="$gray600" fontFamily="$body">
              Você tem o direito de acessar, corrigir e excluir suas informações pessoais a qualquer momento.
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
