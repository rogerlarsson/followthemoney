import { Schema } from './schema'
import { PropertyType } from './type'

export interface IPropertyDatum {
  name: string
  qname: string
  label: string
  type: string
  description?: string
  stub?: boolean
  caption?: boolean
  hidden?: boolean
  required?: boolean
  matchable?: boolean
  range?: string | null
  reverse?: string
}

/**
 * Definition of a property, with relevant metadata for type,
 * labels and other useful criteria.
 */
export class Property {
  public readonly schema: Schema
  public readonly name: string
  public readonly qname: string
  public readonly label: string
  public readonly type: PropertyType
  public readonly caption: boolean
  public readonly hidden: boolean
  public readonly required: boolean
  public readonly matchable: boolean
  public readonly description: string | null
  public readonly stub: boolean
  public readonly hasReverse: boolean
  private readonly range: string | null
  private readonly reverse: string | null

  constructor(schema: Schema, property: IPropertyDatum) {
    this.schema = schema
    this.name = property.name
    this.qname = property.qname
    this.label = property.label
    this.caption = !!property.caption
    this.hidden = !!property.hidden
    this.description = property.description || null
    this.stub = !!property.stub
    this.required = !!property.required
    this.matchable = !!property.matchable
    this.range = property.range || null
    this.reverse = property.reverse || null
    this.type = schema.model.getType(property.type)
    this.hasReverse = this.range !== null && this.reverse !== null
  }

  getRange(): Schema {
    return this.schema.model.getSchema(this.range)
  }

  getReverse(): Property {
    if (this.range === null || this.reverse === null) {
      throw new Error("This property has no reverse")
    }
    return this.getRange().getProperty(this.reverse)
  }

  toString(): string {
    return this.qname
  }
}
