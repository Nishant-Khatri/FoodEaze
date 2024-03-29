import { View, Text, TouchableOpacity, Image } from 'react-native'
import React ,{useState,useMemo} from 'react'
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/BasketSlice';

const DishRow = ({ id, name, description, price, image}) => {
  const[isPressed,setisPressed] = useState(false);
  
  const dispatch = useDispatch();
  const addItemToBasket= () => {
        dispatch(addToBasket({ id, name, description, price, image}));
  }

  const items=useSelector((state)=>selectBasketItemsWithId(state,id));
  
  const removeItemsFromBasket = () =>{
    if(! items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };
  const pr=new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
  return (
    <>
    <TouchableOpacity  onPress={()=>setisPressed(!isPressed)}
    className={`bg-white border p-4 border-gray-200 
    ${isPressed && "border-b-0"
    }`}>
    <View className="flex-row">
     <View className="flex-1 pr-2">
      <Text className="text-lg mb-1">{name}</Text>
      <Text className="text-gray-400">{description}</Text>
      <Text className="text-gray-400 mt-2">{pr}</Text>
      </View>

      <View>
        <Image className="h-20 w-20 bg-gray-300 p-4"
        style={{
          borderWidth: 1,
          borderColor: "#F3F3F4"
        }}
            source={{
              uri: urlFor(image).url()
            }}
            
        />
      </View>
      </View>

    </TouchableOpacity>

    {isPressed && (
      <View className="bg-white px-4">
        <View className="flex-row items-center space-x-2 pb-3">
        <TouchableOpacity
        disabled={!items.length}
        onPress={removeItemsFromBasket}>
          <MinusCircleIcon
         color={items.length > 0?"#AA336A":"gray"}
          size={40}
          />
        </TouchableOpacity>
        <Text>{items.length}</Text>
        <TouchableOpacity
         onPress={addItemToBasket}
        >
          <PlusCircleIcon
          color={"#AA336A"}
          size={40}
          />
        </TouchableOpacity>
        </View>

      </View>
    )}
    </>
  )
}

export default DishRow