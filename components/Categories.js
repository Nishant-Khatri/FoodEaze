import { View, Text, ScrollView } from 'react-native'
import  {useEffect,useState} from 'react'
import CategoryCard from './CategoryCard'
import client from '../sanity';
import { urlFor } from '../sanity';

const Categories = () => {
  const [Categories,setCategories]= useState([]);
  useEffect(() =>{
    client
      .fetch(
        `
        *[_type =="category"]
        `,
      ).then((data)=>{
        setCategories(data);
      });
  }, []);
  return (
    <ScrollView
    contentContainerStyle={{
      paddingHorizontal: 15,
      paddingTop: 10,
    }}
    horizontal
    showsHorizontalScrollIndicator={false}>
    {Categories.map((category)=>(
      
      <CategoryCard
      key={category._id}
      imgUrl={urlFor(category.image).width(200).url()}
      title={category.name}

      />
    ))} 
         {/*Category Card */}
     
     
     
    </ScrollView>
  )
}

export default Categories