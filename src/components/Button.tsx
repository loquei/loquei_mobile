import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  buttonVariant?: 'solid' | 'secondary' | 'outline'
  isLoading?: boolean
}

export function Button({ title, buttonVariant = 'solid', isLoading = false, ...props }: Props) {
  let backgroundColor, activeBgColor, borderWidth: '$1' | '$0', borderColor, textColor;

  switch (buttonVariant) {
    case 'outline':
      backgroundColor = '$secondary100';
      activeBgColor = '$secondary200';
      borderWidth = '$1';
      borderColor = '$secondary100';
      textColor = '$textDark800';
      break;
    case 'secondary':
      backgroundColor = '$green100';
      activeBgColor = '$green300';
      borderWidth = '$0';
      borderColor = undefined;
      textColor = '$teal600';
      break;
    case 'solid':
    default:
      backgroundColor = '$teal600';
      activeBgColor = '$teal700';
      borderWidth = '$0';
      borderColor = undefined;
      textColor = '$white';
      break;
  }

  return (
    <GluestackButton
      w="$full"
      h="$12"
      bg={backgroundColor}
      borderWidth={borderWidth}
      borderColor={borderColor}
      rounded="$sm"
      $active-bg={activeBgColor}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner color="$white" />
      ) : (
        <Text
          color={textColor}
          fontFamily="$mono"
          fontSize="$md"
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}