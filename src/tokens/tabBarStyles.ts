import { ViewStyle, TextStyle } from 'react-native'
import colors from '@/src/tokens/colors'
import { getHeight, getWidth } from '@/src/tokens/StyleHelper'

export const getTabBarStyle = (bottomInset: number): ViewStyle => ({
  height: getHeight(60) + bottomInset,
  paddingBottom: bottomInset + getHeight(8),
  paddingTop: getHeight(8),
  paddingHorizontal: getWidth(18),
  backgroundColor: colors.tabBarBackground,
  borderTopColor: colors.tabBarBackground,
  borderTopWidth: 1,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: getHeight(-2) },
  shadowRadius: getHeight(12),
  elevation: 8,
})

export const tabBarLabelStyle: TextStyle = {
  fontSize: getHeight(12),
  fontWeight: '600',
  marginTop: getHeight(4),
}
