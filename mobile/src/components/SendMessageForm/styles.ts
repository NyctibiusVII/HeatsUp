/* Import ---------------------------------------------------------------------- */ // - x70

import { StyleSheet }     from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { COLORS }         from '../../theme'

/* ---------------------------------------------------------------------- */

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 184,
        backgroundColor: COLORS.BLACK_TERTIARY,
        paddingTop: 16,
        paddingBottom: getBottomSpace() + 16,
        paddingHorizontal: 24
    },
    input: {
        width: '100%',
        height: 88,
        color: COLORS.WHITE,
        textAlignVertical: 'top'
    }
})