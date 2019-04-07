export * from './entity'
export * from './model'
export * from './property'
export * from './schema'
export * from './type'

import defaultModel_ from './defaultModel.json';
import { IModelDatum } from './model';
export const defaultModel: IModelDatum = defaultModel_;