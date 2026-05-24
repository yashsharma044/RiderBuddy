import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMemo, useState } from 'react'
import { useRouter } from 'expo-router'
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import colors from '@/src/tokens/colors'
import { getHeight, getWidth } from '@/src/tokens/StyleHelper'
import HomeHeader from '@/src/components/home/HomeHeader'
import ToggleButton from '@/src/components/ui/ToggleButton'
import HomeSearchCard from '@/src/components/home/HomeSearchCard'
import LocationPickerSheet from '@/src/components/ui/LocationPickerSheet'
import RecentSearches from '@/src/components/home/RecentSearches'
import Snackbar from '@/src/components/ui/Snackbar'
import BookingModal from '@/src/components/home/BookingModal'
import SafeScreen from '@/src/components/ui/SafeScreen'
import {
  locationOptions,
  maxSeats,
  minSeats,
} from '@/src/constants/home'
import { useLanguage } from '@/src/context/LanguageContext'
import { recentSearches } from '@/src/data/rideData'
import { HomeMode, LocationField } from '@/src/types/home'

type PickerField = LocationField | 'date' | 'time' | null

const initialDate = new Date()

const formatDateLabel = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

const formatTimeLabel = (date: Date) =>
  date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

const HomeScreen = () => {
  const { t } = useLanguage()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const [selectedMode, setSelectedMode] = useState<HomeMode>('find')

  // Independent states for 'find' and 'offer' modes
  const [findState, setFindState] = useState({
    pickup: '',
    destination: '',
    date: initialDate,
    dateLabel: formatDateLabel(initialDate),
    seats: 1,
  })

  const [offerState, setOfferState] = useState({
    pickup: '',
    destination: '',
    date: initialDate,
    dateLabel: formatDateLabel(initialDate),
    time: '',
    seats: 1,
  })

  const currentModeState = selectedMode === 'find' ? findState : offerState
  
  const pickup = currentModeState.pickup
  const destination = currentModeState.destination
  const selectedDate = currentModeState.date
  const dateLabel = currentModeState.dateLabel
  const departureTime = selectedMode === 'offer' ? offerState.time : ''
  const seats = currentModeState.seats

  const updateCurrentState = (updates: any) => {
    if (selectedMode === 'find') {
      setFindState((prev) => ({ ...prev, ...updates }))
    } else {
      setOfferState((prev) => ({ ...prev, ...updates }))
    }
  }

  const setPickup = (val: string) => updateCurrentState({ pickup: val })
  const setDestination = (val: string) => updateCurrentState({ destination: val })
  const setSelectedDate = (val: Date) => updateCurrentState({ date: val })
  const setDateLabel = (val: string) => updateCurrentState({ dateLabel: val })
  const setDepartureTime = (val: string) => setOfferState((prev) => ({ ...prev, time: val }))
  const setSeats = (updater: (prev: number) => number) => {
    updateCurrentState({ seats: updater(currentModeState.seats) })
  }

  const [pickerField, setPickerField] = useState<PickerField>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [locationQuery, setLocationQuery] = useState('')
  const [isCurrentLocationLoading, setIsCurrentLocationLoading] = useState(false)
  const [locationPermissionError, setLocationPermissionError] = useState('')
  const [bookingModalVisible, setBookingModalVisible] = useState(false)
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [errors, setErrors] = useState({
    pickup: '',
    destination: '',
    time: '',
  })

  // Build toggle options from translations
  const modeOptions: Array<{ id: HomeMode; label: string }> = useMemo(
    () => [
      { id: 'find', label: t.findRide },
      { id: 'offer', label: t.offerRide },
    ],
    [t],
  )

  const filteredLocations = useMemo(() => {
    const query = locationQuery.trim().toLowerCase()
    if (!query) return locationOptions
    return locationOptions.filter((item) => item.toLowerCase().includes(query))
  }, [locationQuery])

  const isSubmitDisabled = useMemo(() => {
    const hasLocations =
      pickup.length > 0 && destination.length > 0 && pickup !== destination
    const dateValid = dateLabel.length > 0
    const timeValid = selectedMode === 'find' ? true : departureTime.length > 0
    return !(hasLocations && dateValid && timeValid)
  }, [pickup, destination, dateLabel, departureTime, selectedMode])

  const openLocationPicker = (field: LocationField) => {
    setPickerField(field)
    setLocationQuery('')
    setErrors({ pickup: '', destination: '', time: '' })
    setLocationPermissionError('')
  }

  const handleSelectLocation = (value: string) => {
    if (pickerField === 'pickup') setPickup(value)
    if (pickerField === 'destination') setDestination(value)
    setPickerField(null)
    setLocationQuery('')
  }

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message)
    setSnackbarVisible(true)
    setTimeout(() => setSnackbarVisible(false), 1800)
  }

  const handleUseCurrentLocation = () => {
    setLocationPermissionError('')
    setIsCurrentLocationLoading(true)
    showSnackbar(t.fetchingLocation)

    setTimeout(() => {
      const permissionState = 'granted'

      if (permissionState !== 'granted') {
        const errorMessage =
          permissionState === 'denied'
            ? t.permissionDenied
            : permissionState === 'blocked'
              ? t.permissionBlocked
              : permissionState === 'unavailable'
                ? t.permissionUnavailable
                : t.permissionTimeout
        setLocationPermissionError(errorMessage)
        setIsCurrentLocationLoading(false)
        showSnackbar(errorMessage)
        return
      }

      if (pickerField === 'pickup') setPickup(t.currentLocation)
      if (pickerField === 'destination') setDestination(t.currentLocation)
      setIsCurrentLocationLoading(false)
      setPickerField(null)
      setLocationQuery('')
      showSnackbar(t.currentLocationSelected)
    }, 1000)
  }

  const handleRecentSearchSelect = (item: {
    pickup: string
    destination: string
    seats: number
    date: string
  }) => {
    setPickup(item.pickup)
    setDestination(item.destination)
    setSeats(() => item.seats) // wrapped in function to match signature
    setDateLabel(item.date)
    setErrors({ pickup: '', destination: '', time: '' })
  }

  const handleSubmit = () => {
    const nextErrors = { pickup: '', destination: '', time: '' }

    if (!pickup) nextErrors.pickup = t.pickupRequired
    if (!destination) nextErrors.destination = t.destinationRequired
    if (pickup && destination && pickup === destination) {
      nextErrors.destination = t.pickupDestinationDifferent
    }
    if (selectedMode === 'offer' && !departureTime) {
      nextErrors.time = t.departureTimeRequired
    }

    setErrors(nextErrors)
    if (nextErrors.pickup || nextErrors.destination || nextErrors.time) return

    if (selectedMode === 'find') {
      router.push(
        `/available-rides?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(
          destination,
        )}&date=${encodeURIComponent(dateLabel)}&seats=${seats}`,
      )
      return
    }

    setBookingModalVisible(true)
  }

  const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false)
    if (date) {
      setSelectedDate(date)
      setDateLabel(formatDateLabel(date))
    }
  }

  const handleTimeChange = (_event: DateTimePickerEvent, date?: Date) => {
    setShowTimePicker(false)
    if (date) {
      setDepartureTime(formatTimeLabel(date))
    }
  }

  return (
    <SafeScreen barStyle="dark" backgroundColor={colors.background}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getHeight(80) },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <HomeHeader />
        <ToggleButton
          options={modeOptions}
          selected={selectedMode}
          onSelect={setSelectedMode}
        />
        <HomeSearchCard
          selectedMode={selectedMode}
          pickup={pickup}
          destination={destination}
          dateLabel={dateLabel}
          departureTime={departureTime}
          seats={seats}
          errors={errors}
          onPickupPress={() => openLocationPicker('pickup')}
          onDestinationPress={() => openLocationPicker('destination')}
          onDatePress={() => setShowDatePicker(true)}
          onTimePress={() => setShowTimePicker(true)}
          onIncrement={() => setSeats((value) => Math.min(maxSeats, value + 1))}
          onDecrement={() => setSeats((value) => Math.max(minSeats, value - 1))}
          onSubmit={handleSubmit}
          isSubmitDisabled={isSubmitDisabled}
        />
        <RecentSearches
          items={recentSearches}
          onSelect={handleRecentSearchSelect}
        />
      </ScrollView>

      <LocationPickerSheet
        visible={pickerField === 'pickup' || pickerField === 'destination'}
        title={pickerField === 'pickup' ? t.leavingFrom : t.goingTo}
        query={locationQuery}
        onQueryChange={setLocationQuery}
        suggestions={filteredLocations}
        onSelect={handleSelectLocation}
        onClose={() => setPickerField(null)}
        onUseCurrentLocation={handleUseCurrentLocation}
        isLoading={isCurrentLocationLoading}
        searchEnabled={true}
        showCurrentLocation={true}
        noResultsText={t.noLocationsFound}
        locationError={locationPermissionError}
        onPermissionRetry={() => setLocationPermissionError('')}
      />

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
          onChange={handleTimeChange}
        />
      )}

      <BookingModal
        visible={bookingModalVisible}
        title={selectedMode === 'find' ? t.rideBooked : t.offerCreated}
        message={t.bookingMessage
          .replace('{pickup}', pickup)
          .replace('{destination}', destination)
          .replace('{date}', dateLabel)
          .replace(
            '{time}',
            selectedMode === 'offer' && departureTime
              ? `at ${departureTime}`
              : '',
          )
          .trim()}
        onClose={() => setBookingModalVisible(false)}
      />
      <Snackbar message={snackbarMessage} visible={snackbarVisible} />
    </SafeScreen>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingHorizontal: getWidth(20),
  },
  scrollContent: {
    paddingTop: getHeight(16),
  },
})

export default HomeScreen
