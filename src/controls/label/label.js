import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, StyleSheet } from 'react-native';
import { COLOR, FONT, scale } from '../../styles/common';

const SLIDE_UP_POSISTION = scale(4);
const SLIDE_DOWN_POSISTION = scale(38);
const SLIDE_LEFT_POSITION = scale(8);
const FONT_SIZE_SMALL = FONT.SIZE_12;
const FONT_SIZE_BIG = FONT.SIZE_14;

class Label extends PureComponent {
  static propTypes = {
    isFloating: PropTypes.bool,
    text: PropTypes.string.isRequired,
    hasError: PropTypes.bool,
    style: PropTypes.any,
    onPress: PropTypes.func,
  };

  state = {
    animation: new Animated.Value(0),
  };

  componentDidMount() {
    this.animate(this.props.isFloating);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFloating !== this.props.isFloating) {
      this.animate(nextProps.isFloating);
    }
  }

  onPress = () => {
    if (typeof this.props.onPress) {
      this.props.onPress();
    }
  };

  /**
   * Start a animated timing to change label position.
   * @param {bool} isFloating if true, slide label up. If false, slide label down.
   */
  animate = isFloating => {
    Animated.timing(this.state.animation, {
      toValue: isFloating ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  render() {
    const { text, isFloating, hasError } = this.props;
    const { animation } = this.state;
    const top = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [SLIDE_DOWN_POSISTION, SLIDE_UP_POSISTION],
    });
    const left = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [SLIDE_LEFT_POSITION, 0],
    });
    const fontSize = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [FONT_SIZE_BIG, FONT_SIZE_SMALL],
    });

    return (
      <Animated.Text
        style={[
          Style.label,
          {
            transform: [{ translateY: top }, { translateX: left }],
            fontSize: fontSize,
          },
          hasError && Style.error,
        ]}
        onPress={this.onPress}
      >
        {text}
      </Animated.Text>
    );
  }
}

const Style = StyleSheet.create({
  label: {
    position: 'absolute',
    color: COLOR.GRAY,
    marginLeft: scale(16),
    backgroundColor: 'transparent',
    transform: [{ translateY: SLIDE_UP_POSISTION }],
    zIndex: 9,
  },
  error: {
    color: COLOR.RED,
  },
});

export default Label;
