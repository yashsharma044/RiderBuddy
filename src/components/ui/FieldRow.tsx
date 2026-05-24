import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native'
import colors from '@/src/tokens/colors'
import fontFamily from '@/src/tokens/fontFamily'
import { getHeight, getWidth } from '@/src/tokens/StyleHelper'

type Props = {
  label: string
  value: string
  placeholder?: string
  icon: string
  actionText?: string
  error?: string
  onPress?: () => void
  disabled?: boolean
  style?: ViewStyle
}

const FieldRow = ({
  label,
  value,
  placeholder,
  icon,
  actionText,
  error,
  onPress,
  disabled,
  style,
}: Props) => {
  const Wrapper = onPress ? Pressable : View

  return (
    <>
      <Wrapper
        style={[
          styles.row,
          onPress && styles.rowPressable,
          disabled && styles.rowDisabled,
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.left}>
          <Text style={[styles.icon, disabled && styles.iconDisabled]}>
            {icon}
          </Text>
          <View style={styles.textGroup}>
            <Text style={[styles.label, disabled && styles.labelDisabled]}>
              {label}
            </Text>
            <Text style={[styles.value, disabled && styles.valueDisabled]}>
              {value || placeholder}
            </Text>
          </View>
        </View>
        {actionText ? (
          <Text style={styles.actionText}>{actionText}</Text>
        ) : onPress ? (
          <Text style={styles.chevron}>›</Text>
        ) : null}
      </Wrapper>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: getHeight(12),
  },
  rowPressable: {
    minHeight: getHeight(52),
  },
  rowDisabled: {
    opacity: 0.6,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: getHeight(16),
    marginRight: getWidth(12),
    color: colors.primary,
  },
  iconDisabled: {
    color: colors.textMuted,
  },
  textGroup: {
    flex: 1,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: getHeight(13),
    color: colors.textMuted,
    marginBottom: getHeight(2),
  },
  labelDisabled: {
    color: colors.textMuted,
  },
  value: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(15),
    color: colors.text,
  },
  valueDisabled: {
    color: colors.textMuted,
  },
  actionText: {
    fontFamily: fontFamily.semibold,
    color: colors.primary,
    fontSize: getHeight(14),
  },
  chevron: {
    color: colors.textMuted,
    fontSize: getHeight(18),
    marginLeft: getWidth(8),
  },
  error: {
    color: colors.danger,
    fontFamily: fontFamily.regular,
    fontSize: getHeight(13),
    marginTop: getHeight(4),
  },
})

export default FieldRow
