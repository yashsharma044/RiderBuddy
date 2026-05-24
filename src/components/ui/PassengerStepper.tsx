import { Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '@/src/tokens/colors'
import fontFamily from '@/src/tokens/fontFamily'
import { getHeight, getWidth } from '@/src/tokens/StyleHelper'

type Props = {
  label: string
  count: number
  onIncrement: () => void
  onDecrement: () => void
  min?: number
  max?: number
}

const PassengerStepper = ({
  label,
  count,
  onIncrement,
  onDecrement,
  min = 1,
  max = 6,
}: Props) => {
  const disableMinus = count <= min
  const disablePlus = count >= max

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.stepper}>
        <Pressable
          style={[styles.control, disableMinus && styles.controlDisabled]}
          onPress={onDecrement}
          disabled={disableMinus}
        >
          <Text
            style={[
              styles.controlText,
              disableMinus && styles.controlTextDisabled,
            ]}
          >
            −
          </Text>
        </Pressable>
        <Text style={styles.count}>{count}</Text>
        <Pressable
          style={[styles.control, disablePlus && styles.controlDisabled]}
          onPress={onIncrement}
          disabled={disablePlus}
        >
          <Text
            style={[
              styles.controlText,
              disablePlus && styles.controlTextDisabled,
            ]}
          >
            +
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: getHeight(12),
  },
  label: {
    fontFamily: fontFamily.semibold,
    color: colors.text,
    fontSize: getHeight(14),
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  control: {
    paddingHorizontal: getWidth(14),
    paddingVertical: getHeight(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlDisabled: {
    opacity: 0.4,
  },
  controlText: {
    fontFamily: fontFamily.bold,
    fontSize: getHeight(16),
    color: colors.primary,
  },
  controlTextDisabled: {
    color: colors.textMuted,
  },
  count: {
    minWidth: getWidth(32),
    textAlign: 'center',
    fontSize: getHeight(15),
    fontFamily: fontFamily.semibold,
    color: colors.text,
  },
})

export default PassengerStepper
