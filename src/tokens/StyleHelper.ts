import { Dimensions } from 'react-native'

const FIGMA_BASE = {
  width: 376,
  height: 812,
}

export const getFigmaBase = () => {
  return FIGMA_BASE
}

export const getWidth = (figmaWidth: number) => {
  const windowWidth = Dimensions.get('window').width
  return (windowWidth / FIGMA_BASE.width) * figmaWidth
}

export const getHeight = (figmaHeight: number) => {
  const windowHeight = Dimensions.get('window').height
  return (windowHeight / FIGMA_BASE.height) * figmaHeight
}
