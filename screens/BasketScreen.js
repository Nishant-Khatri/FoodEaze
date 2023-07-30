import { View, Text, useAnimatedValue ,TouchableOpacity, Image, ScrollView} from 'react-native'
import React,{useMemo,useEffect,useState} from 'react'
import { SafeAreaView} from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../features/RestaurantSlice'
import { XCircleIcon } from 'react-native-heroicons/outline'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/BasketSlice'
import { urlFor } from '../sanity'

const BasketScreen = () => {
    const baskettotal= useSelector(selectBasketTotal);
    const navigation=useNavigation();
    const restaurant=useSelector(selectRestaurant);
    const items=useSelector(selectBasketItems);
    const dispatch=useDispatch();
    const DeliverFee=new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(50);
    const totalamount=new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(baskettotal);
    const orderTotal=new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(baskettotal+50);
    const[groupedItemsInBasket,setGroupedItemsInBasket]=useState([]);
  
    useMemo(()=>{
            const groupedItems=items.reduce((results,item)=>
            {
                (results[item.id]=results[item.id] || []).push(item);
                return results;
            }, {});
            setGroupedItemsInBasket(groupedItems);
    },[items]);
   
  return (
<SafeAreaView className="flex-1 bg-white" >
<View className="flex-1 bg-gray-100">
     <View className="p-5 border-b border-[#00CCbb] bg-white shadow-xs">
        <View>
            <Text className="text-lg font-bold text-center">Cart</Text>
            <Text className="text-gray-400 text-center">{restaurant.title}</Text>
        </View>
<TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-3 right-5 p-2 bg-gray-100 rounded-full">

<XCircleIcon size={35} color="#00CCBB"/>
 
</TouchableOpacity>
     </View>
     <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
        <Image
            source={{
                uri:"http://links.papareact.com/wru",
                
            }}
            className="h-7 w-7 bg-gray-300 p-4"
        />
        <Text className="flex-1">Deliver in 50-75 minutes</Text>
        <TouchableOpacity>
            <Text className="text-[#02CCBB]">Change</Text>
        </TouchableOpacity>
     </View>
     <ScrollView className="divide-y divide-gray-200">
        {Object.entries(groupedItemsInBasket).map(([key,item])=>(
            
            <View key={key}
            className="flex-row items-centre bg-white py-2 px-5 space-x-3">
                <Text className="pt-3">
                    {item.length} X </Text>
                    <Image source={{
                        uri: urlFor(item[0]?.image).url(),
                    }}
                        className="h-12 w-12 rounded-full"
                    />
          
               <Text className="flex-1">{item[0]?.name}</Text>
               <View className="flex-column space-x-2 space-y-2">
               {(() => {
                  const price = new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(item[0]?.price);
             return  <Text className="text-gray-600">{price}</Text>;
               })()}
               <TouchableOpacity className="right-5">
                <Text
                    className="text-[#fc5555] text-xs"
                    onPress={()=>dispatch(removeFromBasket({id:key}))}>
                        REMOVE  (-)
                 </Text>
               </TouchableOpacity>
               </View>
            </View>

        ))}
     </ScrollView>
     <View className="p-5 bg-white mt-5 space-y-4">
        
        <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
           {totalamount}
           </Text>
        </View>

        <View className="flex-row justify-between">
            <Text className="text-gray-400">DeliverFee</Text>
            <Text className="text-gray-400">
           {DeliverFee}
           </Text>
        </View>
         
        <View className="flex-row justify-between">
            <Text className="">Order Total</Text>
            <Text className="font-extrabold">
           {orderTotal}
           </Text>
        </View>
        <TouchableOpacity
        className="items-center rounded-lg bg-[#00ccbb] p-4"
        onPress={() => navigation.navigate("PreparingOrderScreen")}
        >
            <Text className="text-white text-lg font-bold">Place Order</Text>
        </TouchableOpacity>

     </View>
    </View>
    </SafeAreaView>
  )
}

export default BasketScreen