import { Animated, StyleSheet, Text } from 'react-native'
import colors from '@/src/tokens/colors'
import fontFamily from '@/src/tokens/fontFamily'
import { useEffect, useMemo, useRef } from 'react'
import { getHeight, getWidth } from '@/src/tokens/StyleHelper'

type Props = {
  message: string
  visible: boolean
}

const Snackbar = ({ message, visible }: Props) => {
  const translateY = useRef(new Animated.Value(80)).current

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : 80,
      duration: 240,
      useNativeDriver: true,
    }).start()
  }, [visible, translateY])

  if (!visible) return null

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: getWidth(16),
    right: getWidth(16),
    bottom: getHeight(24),
    backgroundColor: colors.text,
    paddingVertical: getHeight(14),
    paddingHorizontal: getWidth(16),
    borderRadius: getHeight(18),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.text,
    shadowOpacity: 0.14,
    shadowRadius: getHeight(18),
    shadowOffset: { width: 0, height: getHeight(8) },
    elevation: 6,
  },
  text: {
    color: colors.surface,
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(14),
  },
})

export default Snackbar
