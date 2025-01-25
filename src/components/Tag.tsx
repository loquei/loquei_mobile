import { Button, Text } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

import { MonitorSmartphone, Cake, Hammer, Car } from 'lucide-react-native';
import { gluestackUIConfig } from '../../config/gluestack-ui.config';

type Props = ComponentProps<typeof Button> & {
  name: string;
  isActive?: boolean;
};

const iconMap: { [key: string]: React.ElementType } = {
  Eletrônicos: MonitorSmartphone,
  Festa: Cake,
  Ferramentas: Hammer,
  Carros: Car,
};

export function Tag({ name, isActive, ...props }: Props) {
  const { tokens } = gluestackUIConfig;
  const IconComponent = iconMap[name];

  return (
    <Button
      mr="$3"
      minWidth="$24"
      h="$10"
      bg={isActive ? '$green100' : '$white'}
      rounded="$full"
      justifyContent="center"
      alignItems="center"
      borderColor={isActive ? '$teal600' : '$secondary100'}
      borderWidth={1}
      gap={6}
      sx={{
        ':active': {
          borderWidth: 1,
        },
      }}
      {...props}
    >
      {IconComponent && (
        <IconComponent
          size={20}
          stroke={isActive ? tokens.colors.teal600 : tokens.colors.textLight600}
        />
      )}
      <Text
        color={isActive ? '$teal600' : '$textLight600'}
        textTransform="uppercase"
        fontSize="$xs"
        fontFamily="$heading"
      >
        {name}
      </Text>
    </Button>
  );
}
