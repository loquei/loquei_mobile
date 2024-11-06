import React, { useRef } from 'react';
import { Text, VStack } from '@gluestack-ui/themed';
import { X } from 'lucide-react-native';

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
import { RatingForm } from './RatingForm';

interface ModalProps {
  type?: 'default' | 'rating';
  title: string;
  description: string;
  confirmButtonText: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  modalRef: React.RefObject<any>;
  itemId?: string;
  raterId?: string;
}

export function Modal({
  type,
  title,
  description,
  confirmButtonText,
  isOpen,
  onConfirm,
  onClose,
  modalRef,
  itemId,
  raterId,
}: ModalProps) {
  const { tokens } = gluestackUIConfig;
  const handleSubmitRef = useRef<() => void>();

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
            <X size={16} color={tokens.colors.textDark800} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          {type === 'rating' ? (
            <RatingForm
              itemId={itemId!}
              raterId={raterId!}
              onSubmitSuccess={onClose}
              onSubmitExternal={(submitFn) => (handleSubmitRef.current = submitFn)}
            />
          ) : (
            <Text size="sm" color="$textDark500">
              {description}
            </Text>
          )}
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
          {type === 'rating' ? (
            <Button
              title={confirmButtonText}
              buttonVariant="solid"
              onPress={() => {
                handleSubmitRef.current?.();
              }}
              flex={1}
            />
          ) : (
            <Button
              title={confirmButtonText}
              buttonVariant="danger"
              onPress={() => {
                onConfirm();
                onClose();
              }}
              flex={1}
            />
          )}
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
}
