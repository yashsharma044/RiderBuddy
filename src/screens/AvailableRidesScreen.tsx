import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useEffect, useMemo, useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { availableRides } from '@/src/data/rideData'
import { getHeight, getWidth } from '@/src/tokens/StyleHelper'
import colors from '@/src/tokens/colors'
import fontFamily from '@/src/tokens/fontFamily'
import SafeScreen from '@/src/components/ui/SafeScreen'
import { useLanguage } from '@/src/context/LanguageContext'

const AvailableRidesScreen = () => {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useLocalSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [rides, setRides] = useState(availableRides)

  const searchSummary = useMemo(() => {
    const pickup = params.pickup ?? ''
    const destination = params.destination ?? ''
    const date = params.date ?? ''
    const seats = params.seats ?? ''
    return `${pickup} → ${destination} · ${date} · ${seats} seats`
  }, [params])

  useEffect(() => {
    setLoading(true)
    setError('')
    const timeout = setTimeout(() => {
      setRides(availableRides)
      setLoading(false)
    }, 700)
    return () => clearTimeout(timeout)
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    setError('')
    setTimeout(() => {
      setRides(availableRides)
      setLoading(false)
    }, 700)
  }

  return (
    <SafeScreen barStyle="dark" backgroundColor={colors.background}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        <Text style={styles.title}>{t.availableRidesTitle}</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>{searchSummary}</Text>
        </View>
        {loading ? (
          <View style={styles.loaderCard}>
            <View style={styles.skeletonRow} />
            <View style={styles.skeletonRowShort} />
          </View>
        ) : error ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{error}</Text>
            <Text style={styles.retryText} onPress={() => handleRefresh()}>
              {t.retry}
            </Text>
          </View>
        ) : rides.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{t.noRidesAvailable}</Text>
          </View>
        ) : (
          rides.map((ride, index) => (
            <Animated.View
              key={ride.id}
              entering={FadeInUp.delay(index * 80)
                .duration(350)
                .springify()
                .damping(16)}
            >
              <View style={styles.rideCard}>
                <View style={styles.rideHeader}>
                  <View style={{ flexShrink: 1 }}>
                    <Text style={styles.driverName}>{ride.driverName}</Text>
                    <Text style={styles.driverSub}>{ride.vehicle}</Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {ride.matchPercentage}%
                    </Text>
                  </View>
                </View>
                <View style={styles.statsRow}>
                  <Text style={styles.rating}>{ride.rating} ★</Text>
                  <Text style={styles.price}>{ride.price}</Text>
                </View>
                <View style={styles.routeRow}>
                  <View style={styles.timeline} />
                  <View style={styles.routeDetails}>
                    <Text style={styles.routeLabel}>{ride.pickup}</Text>
                    <Text style={styles.routeTime}>{ride.pickupTime}</Text>
                    <View style={styles.routeDivider} />
                    <Text style={styles.routeLabel}>{ride.drop}</Text>
                    <Text style={styles.routeTime}>{ride.dropTime}</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          ))
        )}
        <Pressable onPress={() => router.push('/home')}>
          <Text style={styles.backLink}>{t.backToHome}</Text>
        </Pressable>
      </ScrollView>
    </SafeScreen>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: getWidth(20),
    paddingTop: getHeight(18),
    paddingBottom: getHeight(32),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: getHeight(28),
    color: colors.text,
    marginBottom: getHeight(14),
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: getHeight(24),
    padding: getHeight(18),
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: getHeight(18),
  },
  summaryText: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(15),
    color: colors.textMuted,
  },
  loaderCard: {
    height: getHeight(140),
    borderRadius: getHeight(24),
    backgroundColor: colors.surface,
    padding: getHeight(18),
  },
  skeletonRow: {
    height: getHeight(18),
    backgroundColor: colors.secondary,
    borderRadius: getHeight(12),
    marginBottom: getHeight(12),
  },
  skeletonRowShort: {
    width: getWidth(180),
    height: getHeight(18),
    backgroundColor: colors.secondary,
    borderRadius: getHeight(12),
  },
  emptyState: {
    padding: getHeight(28),
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(16),
    color: colors.textMuted,
    marginBottom: getHeight(12),
    textAlign: 'center',
  },
  retryText: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(15),
    color: colors.primary,
  },
  rideCard: {
    backgroundColor: colors.surface,
    borderRadius: getHeight(24),
    padding: getHeight(18),
    marginBottom: getHeight(16),
    borderWidth: 1,
    borderColor: colors.border,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getHeight(12),
  },
  driverName: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(16),
    color: colors.text,
  },
  driverSub: {
    fontFamily: fontFamily.regular,
    fontSize: getHeight(13),
    color: colors.textMuted,
    marginTop: getHeight(4),
  },
  badge: {
    backgroundColor: colors.primarySoft,
    paddingVertical: getHeight(6),
    paddingHorizontal: getWidth(10),
    borderRadius: getHeight(999),
  },
  badgeText: {
    fontFamily: fontFamily.semibold,
    color: colors.surface,
    fontSize: getHeight(13),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getHeight(14),
  },
  rating: {
    fontFamily: fontFamily.semibold,
    color: colors.text,
  },
  price: {
    fontFamily: fontFamily.bold,
    color: colors.text,
  },
  routeRow: {
    flexDirection: 'row',
  },
  timeline: {
    width: getWidth(4),
    backgroundColor: colors.primary,
    borderRadius: getHeight(4),
    marginRight: getWidth(12),
  },
  routeDetails: {
    flex: 1,
  },
  routeLabel: {
    fontFamily: fontFamily.semibold,
    color: colors.text,
    fontSize: getHeight(14),
  },
  routeTime: {
    fontFamily: fontFamily.regular,
    color: colors.textMuted,
    fontSize: getHeight(13),
    marginBottom: getHeight(10),
  },
  routeDivider: {
    height: getHeight(1),
    backgroundColor: colors.border,
    marginVertical: getHeight(8),
  },
  backLink: {
    textAlign: 'center',
    fontFamily: fontFamily.semibold,
    color: colors.primary,
    fontSize: getHeight(15),
    marginTop: getHeight(24),
  },
})

export default AvailableRidesScreen
