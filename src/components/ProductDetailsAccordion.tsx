import { Accordion, AccordionContent, AccordionContentText, AccordionHeader, AccordionIcon, AccordionItem, AccordionTitleText, AccordionTrigger, Divider, Text, VStack, View } from "@gluestack-ui/themed";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";

export function ProductDetailsAccordion() {
  return (
    <VStack mt={16} px={16}>
      <Text fontFamily="$heading" fontSize={"$lg"} color="$textDark800">
        Detalhes do produto
      </Text>
      <Accordion size="sm" variant="unfilled" type="single" isCollapsible={true} isDisabled={false} bg="$white" rounded={"$md"} mt={12}>
        <AccordionItem value="a">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText fontFamily="$heading">
                      <Text fontFamily="$heading" fontSize={"$sm"}>Especificações</Text>
                    </AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText fontFamily="$body">
              The iPhone 13 Pro Max comes with a 1-year limited warranty and up to 90 days of complimentary technical support.
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>
        <Divider />
        <AccordionItem value="b">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>
                      <Text fontFamily="$heading" fontSize={"$sm"}>Garantia</Text>
                    </AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText fontFamily="$body">
              The iPhone 13 Pro Max comes with a 1-year limited warranty and up to 90 days of complimentary technical support.
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>
        <Divider />
        <AccordionItem value="c">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>
                      <Text fontFamily="$heading" fontSize={"$sm"}>Entrega</Text>
                    </AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText fontFamily="$body">
              The delivery time for the iPhone 13 Pro Max is 3-5 business days. Shipping is free.
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </VStack>
  )
}