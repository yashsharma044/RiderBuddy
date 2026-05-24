import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  FadeIn,
} from 'react-native-reanimated'
import { useEffect, useState } from 'react'
import colors from '@/src/tokens/colors'
import fontFamily from '@/src/tokens/fontFamily'
import { getHeight, getWidth } from '@/src/tokens/StyleHelper'
import { useLanguage } from '@/src/context/LanguageContext'

const HomeHeader = () => {
  const { t, locale, toggleLocale } = useLanguage()
  const [greetingIndex, setGreetingIndex] = useState(0)

  // Greeting cycling timer
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((current) => (current + 1) % t.greetings.length)
    }, 3400)
    return () => clearInterval(interval)
  }, [t.greetings.length])

  // Globe spin animation on language change
  const rotation = useSharedValue(0)
  useEffect(() => {
    rotation.value = withSequence(
      withTiming(360, { duration: 400 }),
      withTiming(0, { duration: 0 }),
    )
  }, [locale, rotation])

  const globeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  const userName = 'User'
  const greeting = t.greetings[greetingIndex % t.greetings.length]

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.brand}>
          <Text style={styles.brandText}>{t.brand}</Text>
        </View>

        {/* Greeting text — cross-fades on language and index change */}
        <View style={styles.greetingWrapper}>
          <Animated.Text
            key={`${locale}-${greetingIndex}`}
            entering={FadeIn.duration(420)}
            style={styles.greeting}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {`${greeting}, ${userName}!`}
          </Animated.Text>
        </View>

        {/* Language globe toggle */}
        <Pressable style={styles.globeButton} onPress={toggleLocale}>
          <Animated.Text style={[styles.globeIcon, globeAnimatedStyle]}>
            🌐
          </Animated.Text>
          <Text style={styles.localeLabel}>{locale.toUpperCase()}</Text>
        </Pressable>

        <Pressable style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </Pressable>
      </View>

      <Animated.Text
        key={`heading-${locale}`}
        entering={FadeIn.duration(320)}
        style={styles.heading}
        numberOfLines={3}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
      >
        {t.heading}
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: getHeight(18),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getHeight(16),
  },
  brand: {
    width: getWidth(46),
    height: getHeight(46),
    borderRadius: getHeight(16),
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    color: colors.surface,
    fontFamily: fontFamily.bold,
    fontSize: getHeight(15),
  },
  greetingWrapper: {
    flex: 1,
    marginHorizontal: getWidth(10),
    overflow: 'hidden',
  },
  greeting: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(17),
    color: colors.text,
  },
  globeButton: {
    width: getWidth(44),
    height: getHeight(44),
    borderRadius: 999,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: getWidth(8),
  },
  globeIcon: {
    fontSize: getHeight(16),
  },
  localeLabel: {
    fontFamily: fontFamily.bold,
    fontSize: getHeight(9),
    color: colors.primary,
    marginTop: getHeight(1),
  },
  notificationButton: {
    width: getWidth(44),
    height: getHeight(44),
    borderRadius: 999,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  notificationIcon: {
    fontSize: getHeight(18),
  },
  heading: {
    fontFamily: fontFamily.bold,
    fontSize: getHeight(28),
    color: colors.text,
    lineHeight: getHeight(36),
  },
})

export default HomeHeader
