// src/contexts/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { Modal } from '@components/Modal';

interface ModalContent {
  type?: 'default' | 'rating';
  title: string;
  description: string;
  itemId?: string;
  raterId?: string;
  confirmButtonText: string;
  onConfirm: () => void;
  onClose?: () => void;
}

interface ModalContextData {
  showModal: (content: ModalContent) => void;
  hideModal: () => void;
  getActionMessage: (action: "logout" | "deleteAccount" | "deleteAllItemsFromWishlist" | 'rating') => Omit<ModalContent, 'onConfirm'>;
}

const ModalContext = createContext<ModalContextData | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const ref = useRef(null);

  const actionMessages = {
    logout: {
      title: "Sair da conta",
      description: "Tem certeza que deseja sair da conta?",
      confirmButtonText: "Sair",
    },
    deleteAccount: {
      title: "Deletar conta",
      description: "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.",
      confirmButtonText: "Deletar",
    },
    deleteAllItemsFromWishlist: {
      title: "Deletar todos os itens",
      description: "Tem certeza que deseja deletar todos os itens da lista de desejos?",
      confirmButtonText: "Deletar",
    },
    rating: {
      title: "Avaliar",
      description: "Avalie o produto para ajudar outros usuários.",
      confirmButtonText: "Avaliar",
    },
  };

  const showModal = (content: ModalContent) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  const getActionMessage = (action: "logout" | "deleteAccount" | "deleteAllItemsFromWishlist" | 'rating') => actionMessages[action];

  return (
    <ModalContext.Provider value={{ showModal, hideModal, getActionMessage }}>
      {children}
      {modalContent && (
        <Modal
          type={modalContent.type}
          title={modalContent.title}
          description={modalContent.description}
          itemId={modalContent.itemId}
          raterId={modalContent.raterId}
          confirmButtonText={modalContent.confirmButtonText}
          isOpen={isOpen}
          onClose={
            modalContent.onClose
              ? () => {
                modalContent.onClose!();
                hideModal();
              }
              : hideModal
          }
          onConfirm={() => {
            modalContent.onConfirm();
            hideModal();
          }}
          modalRef={ref}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
