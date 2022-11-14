import React from 'react';
import _ from 'lodash';
import ImageView from 'react-native-image-view';

export default function ImageViewerView(props) {
  const {isImageViewVisible, setImageViewerVisibility, attachments} = props;
  return (
    <ImageView
      images={attachments}
      imageIndex={0}
      isVisible={isImageViewVisible}
      onClose={setImageViewerVisibility}
    />
  );
}
