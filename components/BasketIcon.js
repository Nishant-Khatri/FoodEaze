import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/BasketSlice'
import { useNavigation } from '@react-navigation/native'

const BasketIcon = () => {
    const items=useSelector(selectBasketItems);
    const navigation=useNavigation();
    const baskettotal= useSelector(selectBasketTotal);
    const totalamount=new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(baskettotal);
         
    if(items.length===0) return null;

    return (
    <View className="absolute bottom-10 w-full z-50">
    <TouchableOpacity
    onPress={() =>navigation.navigate("Basket")} 
    className="mx-5  rounded-lg p-4 flex-row 
    items-center space-x-1 bg-[#00ccbb]">
    <Text className="text-white font-extrabold text-lg py-1 px-2 bg-[#01A296]">{items.length}</Text>
    <Text className="flex-1 text-white font-extrabold text-lg text-center">View Cart</Text>
    <Text className="text-lg text-white font-extrabold">{totalamount}</Text>
    </TouchableOpacity>
      
    </View>
  )
}

export default BasketIcon