/* Import ---------------------------------------------------------------------- */ // - x70

import React from 'react'
import { View } from 'react-native'

import { useAuth } from '../../hooks/useAuth'
import { Button }  from '../Button'
import { COLORS }  from '../../theme'

import { styles } from './styles'
/* ---------------------------------------------------------------------- */

export function SignInBox() {
    const { signIn, isSigningIn } = useAuth()

    return (
        <View style={styles.container}>
            <Button
                title="ENTRAR COM O GITHUB"
                backgroundColor={COLORS.YELLOW}
                color={COLORS.BLACK_PRIMARY}
                icon="github"
                onPress={signIn}
                isLoading={isSigningIn}
            />
        </View>
    )
}