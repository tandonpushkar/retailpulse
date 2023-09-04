import React, {ForwardedRef, forwardRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextProps,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';

export const CustomTouchableOpacity = forwardRef(
  (props: TouchableOpacityProps, ref: ForwardedRef<TouchableOpacity>) => {
    const {...rest} = props;
    return <TouchableOpacity ref={ref} {...rest} activeOpacity={0.8} />;
  },
);
