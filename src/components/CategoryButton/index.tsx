import { Text, PressableProps } from 'react-native';
import { CategoryButtonPressable, CategoryText } from './styles'
import { Heading } from '@/styles/GlobalStyles';

// Category Props tem todas as props de Pressable e as demais adicionadas
type CategoryProps = PressableProps & {
  title: string;
  isSelected?: boolean;
}

export function CategoryButton({ title, isSelected, ...rest }: CategoryProps) {

  return (
    <CategoryButtonPressable {...rest}>
      <CategoryText style={Heading.defaultText}>{title}</CategoryText>
    </CategoryButtonPressable>
  )
}