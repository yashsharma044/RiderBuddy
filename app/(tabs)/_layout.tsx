import { Tabs } from 'expo-router'
import colors from '@/src/tokens/colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLanguage } from '@/src/context/LanguageContext'
import { getTabBarStyle, tabBarLabelStyle } from '@/src/tokens/tabBarStyles'
import { getHeight } from '@/src/tokens/StyleHelper'

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  const { t } = useLanguage()
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: getTabBarStyle(insets.bottom),
        tabBarActiveTintColor: colors.surface,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: tabBarLabelStyle,
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: t.home || 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="car" size={getHeight(22)} color={color} />
          )
        }} 
      />
    </Tabs>
  )
}
