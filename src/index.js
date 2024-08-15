import React from 'react';
import { Platform, TextInput, View } from 'react-native';
import PickerSelect, { defaultStyles } from 'react-native-picker-select';

export default class RNPickerSelect extends PickerSelect {
  constructor(props) {
    super(props);
  }

  isDarkTheme() {
    const { darkTheme } = this.props;

    return (Platform.OS === 'ios' || Platform.OS === 'harmony') && darkTheme;
  }

  renderTextInputOrChildren() {
    const { children, style, textInputProps } = this.props;
    const { selectedItem } = this.state;

    const containerStyle =
      (Platform.OS === 'ios' || Platform.OS === 'harmony') ? style.inputIOSContainer : style.inputAndroidContainer;

    if (children) {
      return (
        <View pointerEvents="box-only" style={containerStyle}>
          {children}
        </View>
      );
    }

    return (
      <View pointerEvents="box-only" style={containerStyle}>
        <TextInput
          testID="text_input"
          style={[
            (Platform.OS === 'ios' || Platform.OS === 'harmony') ? style.inputIOS : style.inputAndroid,
            this.getPlaceholderStyle(),
          ]}
          value={selectedItem.inputLabel ? selectedItem.inputLabel : selectedItem.label}
          ref={this.setInputRef}
          editable={false}
          {...textInputProps}
        />
        {this.renderIcon()}
      </View>
    );
  }

  render() {
    const { children, useNativeAndroidPickerStyle } = this.props;

    if ((Platform.OS === 'ios' || Platform.OS === 'harmony')) {
      return this.renderIOS();
    }

    if (Platform.OS === 'web') {
      return this.renderWeb();
    }

    if (children || !useNativeAndroidPickerStyle) {
      return this.renderAndroidHeadless();
    }

    return this.renderAndroidNativePickerStyle();
  }
}

export { defaultStyles };
