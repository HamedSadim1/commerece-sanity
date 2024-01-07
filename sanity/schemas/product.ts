import {Rule} from 'sanity'

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Title',
      type: 'string',
      description: 'Name of the product',
      validation: (Rule: Rule) => Rule.required().error('Title is required'),
    },
    {
      name: 'description',
      title: 'Product Description',
      type: 'text',
      description: 'Description of the product',
      validation: (Rule: Rule) => Rule.required().error('description is required'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Slug of the product',
      validation: (Rule: Rule) => Rule.required().error('Slug is required'),
      options: {
        source: 'name',
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the product',
      validation: (Rule: Rule) => Rule.required().error('Price is required'),
    },
    {
      name:"price_id",
      title:"Stripe Price ID",
      type:"string",
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'array',
      description: 'Image of the product',
      of: [{type: 'image'}],
      validation: (Rule: Rule) => Rule.required().error('Image is required'),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Category of the product',
      validation: (Rule: Rule) => Rule.required().error('Category is required'),
    },
    
  ],
}
