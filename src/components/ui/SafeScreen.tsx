import { type ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar, type StatusBarStyle } from 'expo-status-bar'
import colors from '@/src/tokens/colors'

type Props = {
  children: ReactNode
  barStyle?: StatusBarStyle
  backgroundColor?: string
}

/**
 * Common wrapper that provides SafeAreaView + StatusBar for every screen.
 * Use `barStyle` to control light/dark status bar text.
 */
const SafeScreen = ({
  children,
  barStyle = 'dark',
  backgroundColor = colors.background,
}: Props) => {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]}>
      <StatusBar style={barStyle} backgroundColor={backgroundColor} translucent={false} />
      <View style={styles.flex}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
})

export default SafeScreen
