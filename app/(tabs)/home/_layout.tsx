import { Stack } from 'expo-router'
import { useLanguage } from '@/src/context/LanguageContext'

export default function HomeLayout() {
  const { t } = useLanguage()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: t.home || 'Home' }} />
    </Stack>
  )
}
