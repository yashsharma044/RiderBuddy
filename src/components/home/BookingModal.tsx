import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '@/src/tokens/colors'
import fontFamily from '@/src/tokens/fontFamily'
import { getHeight, getWidth } from '@/src/tokens/StyleHelper'
import { useLanguage } from '@/src/context/LanguageContext'

type Props = {
  visible: boolean
  title: string
  message: string
  onClose: () => void
}

const BookingModal = ({ visible, title, message, onClose }: Props) => {
  const { t } = useLanguage()

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{t.okay}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 25, 67, 0.35)',
    justifyContent: 'center',
    paddingHorizontal: getWidth(24),
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: getHeight(28),
    padding: getHeight(24),
    shadowColor: colors.text,
    shadowOpacity: 0.14,
    shadowRadius: getHeight(20),
    shadowOffset: { width: 0, height: getHeight(10) },
    elevation: 10,
  },
  modalTitle: {
    fontFamily: fontFamily.bold,
    fontSize: getHeight(22),
    color: colors.text,
    marginBottom: getHeight(14),
  },
  modalMessage: {
    fontFamily: fontFamily.regular,
    fontSize: getHeight(16),
    color: colors.textMuted,
    lineHeight: getHeight(22),
    marginBottom: getHeight(26),
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: getHeight(14),
    borderRadius: getHeight(18),
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fontFamily.semibold,
    fontSize: getHeight(16),
    color: colors.surface,
  },
})

export default BookingModal
