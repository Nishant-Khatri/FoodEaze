import { View, Text, TouchableOpacity ,Image} from 'react-native'
import React from 'react'

const CategoryCard=({imgUrl,title}) =>{
  return (
    <TouchableOpacity className="relative mr-2">
    <Image
          source={{
            uri: imgUrl,
            }}
          className="h-20 w-20 rounded"


    />
    <View>
      <Text className="absolute bottom-1 left-1 text-white ">
      {title}
      </Text>
    </View>
    </TouchableOpacity>
  )
};
export default CategoryCard;