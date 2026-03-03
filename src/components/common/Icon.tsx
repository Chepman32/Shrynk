import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../theme';
import type { IconProps } from '../../types/common';

export const Icon: React.FC<IconProps> = ({
  name,
  set,
  size = 24,
  color = colors.text.primary,
  style,
}) => {
  const IconComponent = {
    Feather: FeatherIcon,
    MaterialCommunityIcons: MaterialCommunityIcon,
    Ionicons: IoniconsIcon,
    FontAwesome5: FontAwesome5Icon,
  }[set];
  
  return (
    <IconComponent
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};
