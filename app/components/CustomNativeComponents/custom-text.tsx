import React, {ForwardedRef, forwardRef} from 'react';
import {Text, View, StyleSheet, TextProps} from 'react-native';
import {colors, fonts} from '@theme';

const styles = StyleSheet.create({
  Default: {
    fontFamily: fonts.regular,
    color: colors.black,
  },
});

export const CustomText = forwardRef(
  (props: TextProps, ref: ForwardedRef<Text>) => {
    const {style, ...rest} = props;
    return <Text style={[styles.Default, style]} ref={ref} {...rest} />;
  },
);
