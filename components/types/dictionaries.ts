export type NestedDictionary = {
  [key: string]: string | NestedDictionary;
};

export type DictionaryLoader = {
  [key: string]: () => Promise<NestedDictionary>;
};