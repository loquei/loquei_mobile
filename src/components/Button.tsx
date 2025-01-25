import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
  View,
} from '@gluestack-ui/themed'
import React, { ComponentProps } from 'react'

type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  icon?: React.ReactNode
  buttonVariant?: 'solid' | 'secondary' | 'outline' | 'danger' | 'danger-outline'
  isLoading?: boolean
}

export function Button({ title, icon, buttonVariant = 'solid', isLoading = false, ...props }: Props) {
  let backgroundColor, activeBgColor, borderWidth: '$1' | '$0', borderColor, textColor;

  switch (buttonVariant) {
    case 'danger':
      backgroundColor = '$red500';
      activeBgColor = '$red600';
      borderWidth = '$0';
      borderColor = undefined;
      textColor = '$white';
      break;
    case 'danger-outline':
      backgroundColor = '$red100';
      activeBgColor = '$red200';
      borderWidth = '$1';
      borderColor = '$red100';
      textColor = '$red500';
      break;
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
        <>
          {icon && (
            <View mr="$2">
              {icon}
            </View>
          )}
          <Text
            color={textColor}
            fontFamily="$mono"
            fontSize="$md"
          >
            {title}
          </Text>
        </>
      )}
    </GluestackButton>
  )
}