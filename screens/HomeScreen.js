
import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React,{ useState ,useLayoutEffect, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView} from 'react-native-safe-area-context'
import 'react-native-url-polyfill/auto';

import{
  UserIcon,
  ChevronDownIcon,
  DocumentMagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  AdjustmentsIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import client from '../sanity';
// import category from '../sanitydatafood/schemas/category';





const HomeScreen=()=> { 
  const navigaiton=useNavigation();
  const[featuredCategories,setFeaturedCategories] =useState([]);

  useLayoutEffect(() => {
    navigaiton.setOptions({
      headerShown: false,
    });
  },[]);

  
 useEffect(()=>{
  client.fetch(
    `
    *[_type=="featured"]{
      ...,
        restaurant[]->{
          ...,
          dishes[]->,
              }
         }
    `
  ).then((data)=>{
    setFeaturedCategories(data);
  });
 }, []);
// console.log( featuredCategories) ;
  return (
    <SafeAreaView className="bg-gray pt-3 flex-1">
     
        {/* hEADER */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
          <Image
              source={{
                uri:'https://links.papareact.com/wru'
              }}
              className="h-7 w-7  bg-gray-300 p-4 rounded-full"
            />

            <View className="flex-1">
              <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
                 
                 <Text className='font-bold text-xl'>Current Location
                 <ChevronDownIcon size={20} color="#00CCBB"/>
                 </Text>
           
            </View>
            <UserIcon size={35} color="#00CCBB"/>
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
              <View className="flex-row flex-1 space-x-2 bg-gray-200  p-2 rounded">
              <MagnifyingGlassIcon color="gray" size={20}/>
              <TextInput  placeholder='Search Dishes or Restaurant'  keyboardType='default'></TextInput>         
              </View>
            <AdjustmentsVerticalIcon color="#00CCBB"/>
        </View>

        {/* Body */}
     
        <ScrollView>
          {/* Categories */}
          <Categories/>

           {/*Featured row */}

           {featuredCategories?.map((category)=>(

            <FeaturedRow
             key={category._id}
             id={category._id}
             title={category.name}

            description={category.short_description}
        
           />
           ))} 
           
           <View>
           <Text>
           
            </Text>
           </View>
    
          
        </ScrollView>


    </SafeAreaView>
  
  );
};
export default HomeScreen;