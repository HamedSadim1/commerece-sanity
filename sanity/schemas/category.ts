import {Rule} from 'sanity'
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Title',
      type: 'string',
      description: 'Name of the category',
      validation: (Rule: Rule) => Rule.required().error('Title is required'),
    },
  ],
}
