import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import SectionCard from '@/src/components/ui/SectionCard'
import { RecentSearchItem } from '@/src/data/rideData'
import { getHeight, getWidth } from '@/src/tokens/StyleHelper'
import colors from '@/src/tokens/colors'
import fontFamily from '@/src/tokens/fontFamily'
import { useLanguage } from '@/src/context/LanguageContext'

type Props = {
  items: RecentSearchItem[]
  onSelect: (item: RecentSearchItem) => void
}

const RecentSearches = ({ items, onSelect }: Props) => {
  const { t } = useLanguage()

  return (
    <SectionCard style={styles.card}>
      <Text style={styles.title}>{t.recentSearchesTitle}</Text>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>{t.noRecentSearches}</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.item,
                pressed && styles.itemPressed,
              ]}
              onPress={() => onSelect(item)}
            >
              <View style={styles.row}>
                <View style={{ flexShrink: 1 }}>
                  <Text style={styles.label}>{t.recentSearchFrom}</Text>
                  <Text style={styles.value} numberOfLines={1}>
                    {item.pickup}
                  </Text>
                </View>
                <View style={styles.meta}>
                  <Text style={styles.label}>{t.recentSearchSeats}</Text>
                  <Text style={styles.value}>{item.seats}</Text>
                </View>
              </View>
              <Text style={styles.destination} numberOfLines={1}>
                {item.destination}
              </Text>
              <Text style={styles.date}>{item.date}</Text>
            </Pressable>
          )}
        />
      )}
    </SectionCard>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: getHeight(20),
    paddingVertical: getHeight(18),
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(16),
    color: colors.text,
    marginBottom: getHeight(12),
  },
  emptyText: {
    fontFamily: fontFamily.regular,
    fontSize: getHeight(15),
    color: colors.textMuted,
  },
  item: {
    paddingVertical: getHeight(14),
    paddingHorizontal: getWidth(4),
  },
  itemPressed: {
    backgroundColor: colors.secondary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getHeight(8),
  },
  meta: {
    alignItems: 'flex-end',
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: getHeight(12),
    color: colors.textMuted,
  },
  value: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(15),
    color: colors.text,
  },
  destination: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(15),
    color: colors.text,
    marginBottom: getHeight(4),
  },
  date: {
    fontFamily: fontFamily.regular,
    fontSize: getHeight(13),
    color: colors.textMuted,
  },
})

export default RecentSearches
