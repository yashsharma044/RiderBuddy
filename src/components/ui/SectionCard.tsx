import { View, StyleSheet, type ViewStyle } from 'react-native'
import { type ReactNode } from 'react'
import colors from '@/src/tokens/colors'
import { getHeight } from '@/src/tokens/StyleHelper'

type Props = {
  children: ReactNode
  style?: ViewStyle
}

const SectionCard = ({ children, style }: Props) => {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: getHeight(24),
    padding: getHeight(16),
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: getHeight(6) },
    shadowOpacity: 0.04,
    shadowRadius: getHeight(14),
    elevation: 2,
  },
})

export default SectionCard
