import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Textarea as GluestackTextarea,
  TextareaInput,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof TextareaInput> & {
  errorMessage?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
}

export function Textarea({
  isReadOnly = false,
  errorMessage = null,
  isInvalid = false,
  ...props
}: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb="$4" w="$full">
      <GluestackTextarea
        isInvalid={isInvalid}
        h="$32"
        borderWidth="$0"
        borderRadius="$md"
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? '$red500' : '$teal600',
        }}
        $invalid={{
          borderWidth: 1,
          borderColor: '$red500',
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <TextareaInput
          px="$4"
          bg="$secondary100"
          color="$textDark800"
          fontFamily="$body"
          placeholderTextColor="$backgroundLight400"
          borderRadius="$md"
          {...props}
        />
      </GluestackTextarea>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}