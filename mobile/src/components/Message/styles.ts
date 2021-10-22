/* Import ---------------------------------------------------------------------- */ // - x70

import { StyleSheet }    from 'react-native'
import { COLORS, FONTS } from '../../theme'

/* ---------------------------------------------------------------------- */

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 36,
    },
    message: {
        color: COLORS.WHITE,
        fontFamily: FONTS.REGULAR,
        fontSize: 15,
        lineHeight: 20,
        marginBottom: 12
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        color: COLORS.WHITE,
        fontSize: 15,
        fontFamily: FONTS.REGULAR,
        marginLeft: 16
    }
})