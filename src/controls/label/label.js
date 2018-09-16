import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, StyleSheet } from 'react-native';
import { COLOR, scale } from '../../styles/common';

const SLIDE_UP_POSISTION = scale(4);
const SLIDE_DOWN_POSISTION = scale(38);
const SLIDE_LEFT_POSITION = scale(8);

class Label extends PureComponent {
  static propTypes = {
    isFloating: PropTypes.bool,
    text: PropTypes.string.isRequired,
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
      useNativeDriver: true,
    }).start();
  };

  getLabelSize = isFloating => {
    return isFloating ? scale(12) : scale(14);
  };

  render() {
    const { text, isFloating } = this.props;
    const { animation } = this.state;
    const top = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [SLIDE_DOWN_POSISTION, SLIDE_UP_POSISTION],
    });
    const left = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [SLIDE_LEFT_POSITION, 0],
    });

    return (
      <Animated.Text
        style={[
          styles.label,
          {
            transform: [{ translateY: top }, { translateX: left }],
            fontSize: this.getLabelSize(isFloating),
          },
        ]}
        onPress={this.onPress}
      >
        {text}
      </Animated.Text>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    color: COLOR.GRAY,
    marginLeft: scale(16),
    backgroundColor: 'transparent',
    transform: [{ translateY: SLIDE_UP_POSISTION }],
    zIndex: 9,
  },
});

export default Label;
