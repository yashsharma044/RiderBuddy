import { StyleSheet, View } from 'react-native'
import Animated, {
  FadeInDown,
  FadeOutUp,
  Layout,
} from 'react-native-reanimated'
import colors from '@/src/tokens/colors'
import SectionCard from '@/src/components/ui/SectionCard'
import PrimaryButton from '@/src/components/ui/PrimaryButton'
import PassengerStepper from '@/src/components/ui/PassengerStepper'
import FieldRow from '@/src/components/ui/FieldRow'
import { getHeight } from '@/src/tokens/StyleHelper'
import { useLanguage } from '@/src/context/LanguageContext'

type Props = {
  selectedMode: 'find' | 'offer'
  pickup: string
  destination: string
  dateLabel: string
  departureTime: string
  seats: number
  errors: {
    pickup?: string
    destination?: string
    time?: string
  }
  onPickupPress: () => void
  onDestinationPress: () => void
  onDatePress: () => void
  onTimePress: () => void
  onIncrement: () => void
  onDecrement: () => void
  onSubmit: () => void
  isSubmitDisabled: boolean
}

const HomeSearchCard = ({
  selectedMode,
  pickup,
  destination,
  dateLabel,
  departureTime,
  seats,
  errors,
  onPickupPress,
  onDestinationPress,
  onDatePress,
  onTimePress,
  onIncrement,
  onDecrement,
  onSubmit,
  isSubmitDisabled,
}: Props) => {
  const { t } = useLanguage()

  return (
    <SectionCard style={styles.card}>
      <Animated.View layout={Layout.springify().damping(20).stiffness(160)}>
        <FieldRow
          label={t.leavingFrom}
          value={pickup}
          placeholder={t.selectPickup}
          icon="◉"
          onPress={onPickupPress}
          error={errors.pickup}
        />
        <View style={styles.divider} />
        <FieldRow
          label={t.goingTo}
          value={destination}
          placeholder={t.selectDestination}
          icon="●"
          onPress={onDestinationPress}
          error={errors.destination}
        />
        <View style={styles.divider} />
        <FieldRow
          label={t.today}
          value={dateLabel}
          placeholder={selectedMode === 'find' ? t.selectDate : t.today}
          icon="🗓"
          onPress={onDatePress}
        />

        {/* Departure time — animated in/out for Offer mode */}
        {selectedMode === 'offer' && (
          <Animated.View
            entering={FadeInDown.duration(300).springify().damping(18)}
            exiting={FadeOutUp.duration(200)}
            layout={Layout.springify().damping(20).stiffness(160)}
          >
            <View style={styles.divider} />
            <FieldRow
              label={t.departureTime}
              value={departureTime}
              placeholder={t.selectTime}
              icon="🕒"
              onPress={onTimePress}
              error={errors.time}
            />
          </Animated.View>
        )}

        <View style={styles.divider} />

        {/* Stepper — no key remount, just reads the label reactively */}
        <PassengerStepper
          label={selectedMode === 'find' ? t.passengers : t.seatsOffered}
          count={seats}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />

        {/* Button — no key remount, label updates in-place */}
        <PrimaryButton
          label={selectedMode === 'find' ? t.search : t.offer}
          onPress={onSubmit}
          style={styles.searchButton}
          disabled={isSubmitDisabled}
        />
      </Animated.View>
    </SectionCard>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: getHeight(16),
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 0,
  },
  searchButton: {
    marginTop: getHeight(20),
  },
})

export default HomeSearchCard
