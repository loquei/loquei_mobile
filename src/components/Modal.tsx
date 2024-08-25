import { Text } from '@gluestack-ui/themed';
import { X } from 'lucide-react-native'

import {
  Modal as ModalContainer,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '../../config/components/modal';

import { Button } from './Button';

import { Heading } from '@gluestack-ui/themed';
import { gluestackUIConfig } from '../../config/gluestack-ui.config';

interface ModalProps {
  title: string;
  description: string;
  confirmButtonText: string;
  isOpen: boolean;
  onClose: () => void;
  modalRef: React.RefObject<any>;
}

export function Modal({ title, description, confirmButtonText, isOpen, onClose, modalRef }: ModalProps) {
  const { tokens } = gluestackUIConfig;

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={modalRef}
      size="lg"
      flex={1}
    >
      <ModalBackdrop bg="$backgroundDark900" />

      <ModalContent
        bg="$white"
        borderRadius="$lg"
        p="$4"
      >
        <ModalHeader>
          <Heading size="lg" color="$textDark800">
            {title}
          </Heading>
          <ModalCloseButton onPress={onClose}>
            <X
              size={16}
              color={tokens.colors.textDark800}
            />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <Text size="sm" color="$textDark500">
            {description}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            title="Cancelar"
            buttonVariant="outline"
            action="secondary"
            onPress={onClose}
            mr="$2"
            flex={1}
          />
          <Button
            title={confirmButtonText}
            buttonVariant="danger"
            onPress={onClose}
            flex={1}
          />
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
}
