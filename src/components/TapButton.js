import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import {TouchableRipple, useTheme} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TapButton = ({
  icon = 'content-save',
  onPress = () => {},
  disabled = false,
}) => {
  const {colors} = useTheme();
  const scale = useSharedValue(1);
  const color = useSharedValue(colors.primary);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: color.value,
      transform: [{scale: scale.value}],
    };
  });

  return (
    <Animated.View
      style={[
        styles.containerStyle,
        {backgroundColor: colors.primary},
        animatedStyle,
      ]}>
      <TouchableRipple
        style={styles.buttonStyle}
        onPress={() => {
          scale.value = withSequence(withSpring(1.2), withSpring(1));
          color.value = withSequence(
            withSpring(colors.accent),
            withSpring(colors.primary),
          );
          onPress();
        }}
        disabled={disabled}>
        <MaterialCommunityIcons name={icon} color={colors.text} size={32} />
      </TouchableRipple>
    </Animated.View>
  );
};

export default TapButton;

const styles = StyleSheet.create({
  containerStyle: {
    width: 60,
    height: 50,
    borderRadius: 5,
    marginVertical: 12,
  },
  buttonStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
