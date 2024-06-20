export const getRecommendations = (
  destinations: any,
  allDestinations: any[]
): any[] => {
  const destinationsData = destinations.attributes.content
  const similarities = allDestinations.map((dest) => ({
    ...dest,
    similarity: textCosineSimilarity(destinationsData, dest.attributes.content),
  }));

  return similarities.sort((a, b) => b.similarity - a.similarity).slice(1, 4);
};

function wordCountMap(str: string): Record<string, number> {
  let words = str.split(" ");
  let wordCount: Record<string, number> = {};
  words.forEach((w) => {
    wordCount[w] = (wordCount[w] || 0) + 1;
  });
  return wordCount;
}

function addWordsToDictionary(wordCountMap: Record<string, number>, dict: Record<string, boolean>): void {
  for (let key in wordCountMap) {
    dict[key] = true;
  }
}

function wordMapToVector(map: Record<string, number>, dict: Record<string, boolean>): number[] {
  let wordCountVector: number[] = [];
  for (let term in dict) {
    wordCountVector.push(map[term] || 0);
  }
  return wordCountVector;
}

function dotProduct(vecA: number[], vecB: number[]): number {
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
}

function magnitude(vec: number[]): number {
  let sum = 0;
  for (let i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i];
  }
  return Math.sqrt(sum);
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
}

function textCosineSimilarity(txtA: string, txtB: string): number {
  const wordCountA = wordCountMap(txtA);
  const wordCountB = wordCountMap(txtB);
  let dict: Record<string, boolean> = {};
  addWordsToDictionary(wordCountA, dict);
  addWordsToDictionary(wordCountB, dict);
  const vectorA = wordMapToVector(wordCountA, dict);
  const vectorB = wordMapToVector(wordCountB, dict);
  return cosineSimilarity(vectorA, vectorB);
}