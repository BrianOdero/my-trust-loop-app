import { View, Text, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { useAuth } from '@/providor/AuthProvidor'

const Homepage = () => {

  const auth = useAuth() as any
  const Logout = async () => {

    auth.signOut()

  }

  return (
    <View>
      <Text>Homepage</Text>
      <TouchableOpacity>
        <Button title='Logout' onPress={Logout}/>
      </TouchableOpacity>
    </View>
  )
}

export default Homepage