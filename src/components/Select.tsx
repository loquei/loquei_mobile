import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Select as GluestackSelect,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from '@gluestack-ui/themed';
import { ChevronDownIcon } from 'lucide-react-native';
import { ComponentProps, useState } from 'react';

type Props = ComponentProps<typeof SelectTrigger> & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
  options?: string[];
};

export function Select({
  isReadOnly = false,
  errorMessage = null,
  isInvalid = false,
  placeholder,
  options,
  ...props
}: Props) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const invalid = !!errorMessage || isInvalid;

  const textColor = selectedValue ? "$textDark800" : "$textLight400";

  return (
    <FormControl isInvalid={invalid} mb="$4" w="$full">
      <GluestackSelect
        onValueChange={(value) => {
          setSelectedValue(value);
        }}
        onOpen={
          () => {
            setIsFocused(true);
          }
        }
        onClose={
          () => {
            setIsFocused(false);
          }
        }
      >
        <SelectTrigger
          bg='$secondary100'
          borderWidth={
            isFocused ? 1 : 0
          }
          borderRadius="$md"
          h="$12"
          opacity={isReadOnly ? 0.5 : 1}
          $invalid={{
            borderWidth: 1,
            borderColor: '$red500',
          }}
          borderColor={isFocused ? '$teal600' : 'transparent'}
          {...props}
        >
          <SelectInput
            placeholder={placeholder}
            fontFamily="$body"
            color={textColor}
            placeholderTextColor="$backgroundLight400"
            px="$4"
            value={selectedValue || ""}
          />
          <SelectIcon as={ChevronDownIcon} mr="$3" />
        </SelectTrigger>

        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {
              options?.map((option, index) => (
                <SelectItem
                  key={index}
                  label={option}
                  value={option}
                />
              ))
            }
          </SelectContent>
        </SelectPortal>
      </GluestackSelect>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}