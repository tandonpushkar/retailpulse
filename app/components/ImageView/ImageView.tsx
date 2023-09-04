import React from 'react';
import FastImage from 'react-native-fast-image';

export const ImageView: any = ({source, resizeMode, ...props}: any) => {
  return (
    <FastImage
      //defaultSource={Images.fallback1}
      source={source}
      resizeMode={resizeMode || 'cover'}
      {...(props as any)}
    />
  );
};

ImageView.displayName = 'Image';
