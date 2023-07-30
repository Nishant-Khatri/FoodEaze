import { View, Text, ScrollView } from 'react-native'
import React ,{useEffect,useState} from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import client from '../sanity'
import 'react-native-url-polyfill/auto';

const FeaturedRow = ({id,title,description}) => {
    const[restaurant, setRestaurant]= useState([]);
 
    useEffect(() => {
     client.fetch(
        `
          *[_type=="featured" && _id == $id]
          {
             ...,
             restaurant[]->{
                ...,
                dishes[]->,
                type->{
                    name
                }
             },
          }[0]
        `,
        { id }
        )
        .then((data)=>{ 
       //r   console.log('API Response:', data);
      if (data && data.restaurant && data.restaurant.length > 0) {
 //console.log('Restaurant Data:', data.restaurant[0].dishes);
        setRestaurant(data.restaurant||[]);
      } else {
       console.log('No Restaurant Data.');
        setRestaurant([]);
       }
    });}, [id]);
    
    

  return (
    <View >
    <View className="mt-4 flex-row  items-center justify-between px-4">
      <Text className="font-bold taxt-lg">{title}</Text>
      <ArrowRightIcon color="#00CCBB"/>
     </View>
     <Text className="text-xs text-gray-500 px-4">{description}</Text>
     <ScrollView
        horizontal
        contentContainerStyle={{
            paddingHorizontal:15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
>
{/*RestaurantsCard*/}
{ restaurant.length > 0 ? ( 
  restaurant?.map((res)=>(
    
    <RestaurantCard
    key={res._id}
    id={res._id}
    imgUrl={res.image}
    title={res.Name}
    rating={res.rating}
    genre={res.type?.name}
    address={res.address}
    short_description={res.short_description}
    dishes={res.dishes}
    long={res.long}
    lat={res.lat}
/>
))
):
(
  <Text>No Restaurant Available</Text>
)} 
 
     </ScrollView>
    </View>
  )
}

export default FeaturedRow;