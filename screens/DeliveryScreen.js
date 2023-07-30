import { View, Text,  TouchableOpacity, Image } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/RestaurantSlice'
import { XCircleIcon } from 'react-native-heroicons/outline'
import MapView ,{Marker} from "react-native-maps"

const DeliveryScreen = () => {
    const navigation=useNavigation();
    const restaurant=useSelector(selectRestaurant);
  return (
    
    <View className="bg-[#00CCBB] flex-1">
    <SafeAreaView className="z-50">
    <View className="flex-row justify-between items-center p-5">
    <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
        <XCircleIcon color="white" size={30}/>
    </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
    </View>

    <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
       <View className="flex-row justify-between">
       <View>
       <Text className="text-lg text-gray-400">Estimated Arrival</Text>
       <Text className="text-3xl font-bold">45-55 Minutes</Text>
       </View>
      <Image
        source={{
            uri: "http://links.papareact.com/fls",
        }}
        className="h-20 w-20"
      />
      </View>

      <Progress.Bar size={30} color="#00CCBB" indeterminate={true}/>
      <Text className="mt-3 text-gray-500">Your Order at {restaurant.title} is being prepared...</Text>
    </View>
    </SafeAreaView>

  <MapView className="flex-1 -mt-10 z-0"
  initialRegion={
    {
        latitude: restaurant.lat,
        longitude: restaurant.long,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    }
    
  }
 
  mapType='mutedStandard'
  >
<Marker
  className=""
  coordinate={{
    latitude: restaurant.lat,
    longitude: restaurant.long,
  }}
  title={restaurant.title}
  description={restaurant.short_description}
  identifier='origin'
  pinColor='#00ccbb'

/>
  </MapView>
  <SafeAreaView className="bg-white flex-row items-center space-x-2 h-28">
    <Image
    source={{
        uri: 'http://links.papareact.com/wru',
    }}
        className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
    />
    <View className="flex-1">
        <Text className="text-lg">Nishant Khatri</Text>
        <Text className="text-gray-400 ">Your Rider</Text>
    </View>
    <Text  className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
  </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen