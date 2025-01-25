import { useState } from 'react';
import MaskInput, { formatWithMask, Masks } from 'react-native-mask-input';

export function cpfMask(cpf: string) {
  const { masked } = formatWithMask({
    text: cpf,
    mask: Masks.BRL_CPF,
  })

  return masked;
}

export function phoneMask(phone: string) {
  const { masked } = formatWithMask({
    text: phone,
    mask: Masks.BRL_PHONE,
  })

  return masked;
}

export function dateMask(date: string) {
  const { masked } = formatWithMask({
    text: date,
    mask: Masks.DATE_DDMMYYYY,
  })

  return masked;
}