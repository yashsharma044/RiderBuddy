import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { useEffect, useState } from 'react'
import colors from '@/src/tokens/colors'
import fontFamily from '@/src/tokens/fontFamily'
import { getHeight, getWidth } from '@/src/tokens/StyleHelper'

type Option = {
  id: 'find' | 'offer'
  label: string
}

type Props = {
  options: Option[]
  selected: 'find' | 'offer'
  onSelect: (value: 'find' | 'offer') => void
}

const SPRING_CONFIG = {
  damping: 18,
  stiffness: 200,
  mass: 0.6,
}

const ToggleButton = ({ options, selected, onSelect }: Props) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const translateX = useSharedValue(0)

  const pillWidth = containerWidth > 0 ? (containerWidth - getWidth(6)) / 2 : 0

  useEffect(() => {
    if (containerWidth <= 0) return
    const targetIndex = options.findIndex((o) => o.id === selected)
    const targetX =
      targetIndex === 0 ? getWidth(3) : getWidth(3) + pillWidth
    translateX.value = withSpring(targetX, SPRING_CONFIG)
  }, [selected, containerWidth, pillWidth, options, translateX])

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: pillWidth,
  }))

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {/* Animated sliding pill */}
      {containerWidth > 0 && (
        <Animated.View style={[styles.pill, pillStyle]} />
      )}

      {/* Buttons on top */}
      {options.map((option) => {
        const active = option.id === selected
        return (
          <Pressable
            key={option.id}
            onPress={() => onSelect(option.id)}
            style={styles.button}
          >
            <Text
              style={[styles.label, active && styles.labelActive]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {option.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    borderRadius: 999,
    height: getHeight(50),
    marginBottom: getHeight(18),
    position: 'relative',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pill: {
    position: 'absolute',
    top: getHeight(4),
    bottom: getHeight(4),
    borderRadius: 999,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: getHeight(4) },
    shadowOpacity: 0.25,
    shadowRadius: getHeight(8),
    elevation: 4,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 1,
  },
  label: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(14),
    color: colors.textMuted,
    paddingHorizontal: getWidth(4),
  },
  labelActive: {
    color: colors.surface,
  },
})

export default ToggleButton
