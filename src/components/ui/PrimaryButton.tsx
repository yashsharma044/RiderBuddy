import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native'
import colors from '@/src/tokens/colors'
import fontFamily from '@/src/tokens/fontFamily'
import { getHeight } from '@/src/tokens/StyleHelper'

type Props = {
  label: string
  onPress: () => void
  style?: ViewStyle
  disabled?: boolean
}

const PrimaryButton = ({ label, onPress, style, disabled }: Props) => {
  return (
    <Pressable
      style={[styles.button, style, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.label, disabled && styles.labelDisabled]}>
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: getHeight(14),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: getHeight(6) },
    shadowOpacity: 0.08,
    shadowRadius: getHeight(12),
    elevation: 3,
  },
  label: {
    color: colors.surface,
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(15),
    letterSpacing: 0.2,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
  },
  labelDisabled: {
    color: colors.textMuted,
  },
})

export default PrimaryButton
