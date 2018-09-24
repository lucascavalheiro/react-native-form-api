import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, StyleSheet, Text } from 'react-native';
import { isNullOrEmpty } from '../../utils/string';
import { COLOR, FONT, scale } from '../../styles/common';

class ErrorMessage extends PureComponent {
  static propTypes = {
    message: PropTypes.string,
    style: PropTypes.any,
  };

  state = {
    animation: new Animated.Value(0),
    visible: !isNullOrEmpty(this.props.message),
  };

  componentDidUpdate(prevProps) {
    const { message } = this.props;
    if (prevProps.message !== message) {
      if (isNullOrEmpty(message)) {
        // animate component to hide the message
        this.animate(false);
      } else {
        // animate component to show the message
        this.animate(true);
      }
    }
  }

  /**
   * Animate component to display or hide the error message
   * @param {bool} visible indicates if it'll animate to display or hide the message
   */
  animate = (visible = true) => {
    this.setState({ visible });

    Animated.timing(this.state.animation, {
      toValue: visible ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { message, style } = this.props;
    const { animation, visible } = this.state;

    if (!visible) {
      return null;
    }

    return (
      <Animated.View style={[Style.container, { opacity: animation }]}>
        <Text style={[Style.message, style]}>{message}</Text>
      </Animated.View>
    );
  }
}

const Style = StyleSheet.create({
  container: {
    paddingTop: scale(4),
    paddingRight: scale(16),
  },
  message: {
    color: COLOR.RED,
    textAlign: 'right',
    fontSize: FONT.SIZE_12,
  },
});

export default ErrorMessage;
