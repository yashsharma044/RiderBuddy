import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '@/src/tokens/colors'
import fontFamily from '@/src/tokens/fontFamily'
import { getHeight, getWidth } from '@/src/tokens/StyleHelper'
import { useLanguage } from '@/src/context/LanguageContext'

type Props = {
  visible: boolean
  title: string
  query: string
  onQueryChange: (value: string) => void
  suggestions: string[]
  onSelect: (value: string) => void
  onClose: () => void
  onUseCurrentLocation?: () => void
  isLoading: boolean
  searchEnabled?: boolean
  showCurrentLocation?: boolean
  noResultsText?: string
  locationError?: string
  onPermissionRetry?: () => void
}

const LocationPickerSheet = ({
  visible,
  title,
  query,
  onQueryChange,
  suggestions,
  onSelect,
  onClose,
  onUseCurrentLocation,
  isLoading,
  searchEnabled = true,
  showCurrentLocation = false,
  noResultsText,
  locationError,
  onPermissionRetry,
}: Props) => {
  const { t } = useLanguage()
  const insets = useSafeAreaInsets()

  const resolvedNoResults = noResultsText ?? t.noLocationsFound

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 80}
          style={styles.sheetWrapper}
        >
          <View
            style={[
              styles.sheet,
              { paddingBottom: getHeight(32) + insets.bottom },
            ]}
          >
            <View style={styles.handle} />
            <View style={styles.header}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Pressable style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeIcon}>×</Text>
              </Pressable>
            </View>
            {searchEnabled ? (
              <View style={styles.inputWrapper}>
                <TextInput
                  value={query}
                  onChangeText={onQueryChange}
                  placeholder={t.searchLocation}
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                  clearButtonMode="while-editing"
                />
              </View>
            ) : null}
            {locationError ? (
              <View style={styles.permissionNotice}>
                <Text style={styles.permissionHeader}>
                  {t.locationPermissionHeader}
                </Text>
                <Text style={styles.permissionMessage}>{locationError}</Text>
                {onPermissionRetry ? (
                  <Pressable
                    style={styles.retryButton}
                    onPress={onPermissionRetry}
                  >
                    <Text style={styles.retryButtonText}>{t.tryAgain}</Text>
                  </Pressable>
                ) : null}
              </View>
            ) : null}
            {showCurrentLocation && onUseCurrentLocation ? (
              <Pressable
                style={styles.currentLocation}
                onPress={onUseCurrentLocation}
              >
                <Text style={styles.currentLocationLabel} numberOfLines={1}>
                  {t.currentLocationLabel}
                </Text>
                <Text style={styles.currentLocationState}>
                  {isLoading ? t.fetchingLocation : t.tapToSelect}
                </Text>
              </Pressable>
            ) : null}
            <ScrollView
              style={styles.suggestionList}
              contentContainerStyle={styles.suggestionContent}
            >
              {isLoading ? (
                <Text style={styles.emptyText}>
                  {t.fetchingNearbyLocations}
                </Text>
              ) : suggestions.length === 0 ? (
                <Text style={styles.emptyText}>{resolvedNoResults}</Text>
              ) : (
                suggestions.map((item) => (
                  <Pressable
                    key={item}
                    style={styles.suggestionItem}
                    onPress={() => onSelect(item)}
                  >
                    <Text style={styles.suggestionText}>{item}</Text>
                  </Pressable>
                ))
              )}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 25, 67, 0.22)',
    justifyContent: 'flex-end',
  },
  sheetWrapper: {
    width: '100%',
  },
  sheet: {
    borderTopLeftRadius: getHeight(28),
    borderTopRightRadius: getHeight(28),
    backgroundColor: colors.surface,
    paddingHorizontal: getWidth(20),
    paddingBottom: getHeight(32),
    paddingTop: getHeight(16),
    minHeight: getHeight(360),
  },
  handle: {
    width: getWidth(80),
    height: getHeight(5),
    backgroundColor: colors.border,
    borderRadius: 999,
    alignSelf: 'center',
    marginBottom: getHeight(18),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getHeight(20),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: getHeight(20),
    color: colors.text,
    flex: 1,
    marginRight: getWidth(8),
  },
  closeButton: {
    width: getWidth(36),
    height: getHeight(36),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },
  closeIcon: {
    fontSize: getHeight(22),
    color: colors.text,
  },
  inputWrapper: {
    marginBottom: getHeight(16),
  },
  input: {
    height: getHeight(52),
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: getHeight(18),
    paddingHorizontal: getWidth(16),
    color: colors.text,
    fontFamily: fontFamily.regular,
    fontSize: getHeight(16),
    backgroundColor: colors.secondary,
  },
  currentLocation: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: getHeight(18),
    padding: getHeight(14),
    backgroundColor: colors.background,
    marginBottom: getHeight(16),
  },
  currentLocationLabel: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(15),
    color: colors.text,
    marginBottom: getHeight(4),
  },
  currentLocationState: {
    fontFamily: fontFamily.regular,
    fontSize: getHeight(13),
    color: colors.textMuted,
  },
  permissionNotice: {
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: 'rgba(251, 220, 220, 0.84)',
    borderRadius: getHeight(18),
    padding: getHeight(14),
    marginBottom: getHeight(16),
  },
  permissionHeader: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(14),
    color: colors.danger,
    marginBottom: getHeight(6),
  },
  permissionMessage: {
    fontFamily: fontFamily.regular,
    fontSize: getHeight(13),
    color: colors.text,
    marginBottom: getHeight(10),
  },
  retryButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(10),
    borderRadius: getHeight(14),
  },
  retryButtonText: {
    color: colors.surface,
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(14),
  },
  suggestionList: {
    maxHeight: getHeight(220),
  },
  suggestionContent: {
    paddingBottom: getHeight(20),
  },
  suggestionItem: {
    paddingVertical: getHeight(16),
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  suggestionText: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(16),
    color: colors.text,
  },
  emptyText: {
    fontFamily: fontFamily.regular,
    fontSize: getHeight(15),
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: getHeight(16),
  },
})

export default LocationPickerSheet
