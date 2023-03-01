import {Platform} from 'react-native';
import React from 'react';
import {Icon as CustomIcon} from 'react-native-elements';

const CustomIcons = ({name, size, color, style}) => {
  const iconName = Platform.select({
    ios: 'Material Icons',
    android: 'MaterialIcons',
  });

  return (
    <>
      <CustomIcon
        name={name}
        size={size}
        color={color}
        style={style}
        type={iconName}
      />
    </>
  );
};

export default CustomIcons;
