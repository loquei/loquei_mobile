import { styled } from 'styled-components'

import { View, Text, TouchableOpacity, Image } from 'react-native'
import { theme } from '@/theme'

export const NavbarContainer = styled(View)`
    flex: 1;
    justify-content: center;
    padding: 16px;
    border-top-width: 1px;
    border-top-color: ${theme.colors.gray200};
    background-color: ${theme.colors.white100};
    position: absolute;
    bottom: 0;
    height: 80px;
    width: 100%;
    z-index: 999;

    flex-direction: row;
    justify-content: space-between;
`

export const NavbarButton = styled(TouchableOpacity)`
    padding: 12px;
    align-items: center;
    justify-content: center;
    gap: 4px;
`