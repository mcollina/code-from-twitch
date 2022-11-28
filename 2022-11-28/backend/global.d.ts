import { Entity } from '@platformatic/sql-mapper';
import graphqlPlugin from '@platformatic/sql-graphql'
import { Item } from './types/Item'

declare module '@platformatic/sql-mapper' {
  interface Entities {
    item: Entity<Item>,
  }
}
