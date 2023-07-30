import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'Name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (Rule)=> Rule.required(),
    }),
    defineField({  
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
     validation: (Rule)=> Rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Image of the restaurant',
     type: 'image',
     }),
    defineField({
      name: 'lat',
      title: 'Latitude of the restaurant',
      type: 'number',
      }),
      defineField({
        name: 'long',
        title: 'Longitude of the restaurant',
        type: 'number',
        }),
    defineField({
      name: 'address',
      title: 'Restaurant Address',
      type: 'string',
      validation: (Rule)=> Rule.required(),
    }),
    
    defineField({
      name: "rating",
      type: "number",
      title: 'Enter Rating from(1-5 Stars)',
      validation: (Rule)=> Rule.required().min(1).max(5).error("Please enter a valid rating"),
    }),

    defineField({
      name: "type",
      title: 'Category',
      validation: (Rule)=> Rule.required(),
      type: "reference",
      to: [{type: "category"}],
      }),
      
      defineField({
        name: "dishes",
        type: "array",
        title: 'Dishes',
        of: [{type: "reference", to:[{type: "dish"}] }],
      }),
  ],


})
