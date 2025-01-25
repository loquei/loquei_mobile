import React from 'react';
import { Accordion, AccordionContent, AccordionContentText, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger, Divider, Text, VStack } from '@gluestack-ui/themed';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';

type DetailsAccordionItemData = {
  title: string;
  content: string;
};

type DetailsAccordionProps = {
  type: 'productDetailsScreen' | 'helpScreen';
  items: DetailsAccordionItemData[];
};

const accordionData = {
  productDetailsScreen: [
    {
      title: 'Especificações',
      content: 'Entre em contato com o locador para obter mais informações sobre as especificações do produto.',
    },
    {
      title: 'Garantia',
      content: 'Entre em contato com o locador para obter informações sobre a garantia do produto. A garantia varia de acordo com o tipo de produto.',
    },
    {
      title: 'Entrega',
      content: 'O locador é responsável pela entrega do produto. Certifique-se de combinar o local e horário de entrega com antecedência para evitar atrasos.',
    }
  ],
  helpScreen: [
    {
      title: 'Perguntas Frequentes',
      content: 'Se você tiver alguma dúvida, consulte nossa seção de perguntas frequentes para encontrar as respostas mais comuns.',
    },
    {
      title: 'Suporte ao Cliente',
      content: 'Nossa equipe de suporte ao cliente está disponível 24/7. Entre em contato conosco por e-mail para assistência imediata.',
    },
    {
      title: 'Política de Privacidade',
      content: 'Nós levamos sua privacidade a sério. Consulte nossa política de privacidade para entender como coletamos, usamos e protegemos suas informações.',
    },
    {
      title: 'Termos de Uso',
      content: 'Ao usar nosso aplicativo, você concorda com nossos termos de uso. Leia atentamente para entender suas responsabilidades e direitos ao usar nossos serviços.',
    },
    {
      title: 'Pagamento',
      content: 'O pagamento é realizado entre o locador e o locatário. Recomendamos usar métodos de pagamento seguros e verificar a reputação do locador antes de alugar um produto.',
    },
    {
      title: 'Entrega',
      content: 'O locador é responsável pela entrega do produto. Certifique-se de combinar o local e horário de entrega com antecedência para evitar atrasos.',
    },
    {
      title: 'Segurança',
      content: 'Sua segurança é nossa prioridade. Recomendamos verificar a identidade do locador e inspecionar o produto antes de finalizar o aluguel.',
    }
  ]
};

export default accordionData;

export function DetailsAccordion({ type, items }: DetailsAccordionProps) {
  return (
    <VStack mt={16} px={16}>
      {
        type === 'productDetailsScreen' ? (
          <Text fontFamily="$heading" fontSize={"$lg"} color="$textDark800">
            Detalhes do Produto
          </Text>
        ) : (
          null
        )
      }
      <Accordion size="sm" variant="unfilled" type="single" isCollapsible={true} isDisabled={false} bg="$white" rounded={"$md"} mt={12}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <AccordionItem value={String(index)}>
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => (
                    <>
                      <AccordionTitleText fontFamily="$heading">
                        <Text fontFamily="$heading" fontSize={"$sm"}>{item.title}</Text>
                      </AccordionTitleText>
                      {isExpanded ? (
                        <AccordionIcon as={ChevronUpIcon} />
                      ) : (
                        <AccordionIcon as={ChevronDownIcon} />
                      )}
                    </>
                  )}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <AccordionContentText fontFamily="$body">
                  {item.content}
                </AccordionContentText>
              </AccordionContent>
            </AccordionItem>
            {index < items.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Accordion>
    </VStack>
  );
}