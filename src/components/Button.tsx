import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  variant?: 'solid' | 'outline'
  isLoading?: boolean
}

export function Button({ title, variant = 'solid', isLoading = false, ...props }: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$12"
      bg={variant === 'outline' ? '$secondary100' : '$teal600'}
      borderWidth={variant === 'outline' ? '$1' : '$0'}
      borderColor="$secondary100"
      rounded="$sm"
      $active-bg={variant === 'outline' ? '$secondary200' : '$teal700'}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner color="$white" />
      ) : (
        <Text
          color={variant === 'outline' ? '$textDark800' : '$white'}
          fontFamily="$mono"
          fontSize="$md"
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}