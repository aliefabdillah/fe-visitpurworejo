export type Locale = keyof typeof dictionaries

const dictionaries = {
  id: () => import('@/components/dictionaries/id.json').then(module => module.default),
  en: () => import('@/components/dictionaries/en.json').then(module => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()