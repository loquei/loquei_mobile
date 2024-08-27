import { gluestackUIConfig } from "@gluestack-ui/config";
import { InputIcon } from "@gluestack-ui/themed";
import { InputSlot } from "@gluestack-ui/themed";
import { Input, InputField } from "@gluestack-ui/themed";
import { Search as SearchIcon, Mic } from "lucide-react-native";

export function SearchInput() {
  const { tokens } = gluestackUIConfig;
  return (
    <Input
      bg="$white"
      rounded="$md"
      p={8}
      w={"$full"}
      alignItems="center"
      borderColor="$secondary100"
      $focus={{
        borderWidth: 1,
        borderColor: '$teal600',
      }}
      height={48}
    >
      <InputSlot
        bg="$white"
        rounded="$full"
        justifyContent="center"
      >
        <InputIcon>
          <SearchIcon
            size={16}
            color={tokens.colors.textDark800}
          />
        </InputIcon>
      </InputSlot>
      <InputField
        placeholder="Buscar"
        bg="$white"
        color="$textDark800"
        fontFamily="$body"
        fontSize="$md"
        flex={1}
        alignItems="center"
        textAlignVertical="center"
        height={48}
        lineHeight={24}
        paddingVertical={0}
      />
      <InputSlot
        bg="$white"
        rounded="$full"
        justifyContent="center"
      >
        <InputIcon>
          <Mic
            size={16}
            color={tokens.colors.textDark800}
          />
        </InputIcon>
      </InputSlot>
    </Input>
  )
}