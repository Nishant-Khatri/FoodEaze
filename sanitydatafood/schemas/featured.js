import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured Menu Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Featued Category Name',
      type: 'string',
      validation: (Rule)=> Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short description',
      type: 'string',
      validation: (Rule)=> Rule.max(200),
    }),
    defineField({
      name: 'restaurant',
      title: 'Restaurants',
      type: 'array',
      of:[{ type: "reference",to: [{type:"restaurant",}] }],  
    }),
    defineField({
      name: 'image',
      title: 'Image of the dish ',
      type: 'image',
      
    }),
  ],

})
