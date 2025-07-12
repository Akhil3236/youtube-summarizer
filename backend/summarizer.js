import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

const nlp = winkNLP(model);
const its = nlp.its;
const as = nlp.as;

export function summarizeText(text) {
  try {
    const doc = nlp.readDoc(text);
    const sentences = doc.sentences().out();
    const topSentences = sentences.slice(0, 200); // Get first 5 sentences
    return topSentences.join(' ');
  } catch (err) {
    console.error("Summarizer error:", err);
    return "Error summarizing.";
  }
}
