import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'sanitydatafood',

  projectId: '6exezn6i',
  dataset: 'ds2',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
