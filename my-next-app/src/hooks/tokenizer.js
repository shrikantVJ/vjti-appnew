export function simpleTokenCount(text) {
    // This is a very basic tokenizer that splits on whitespace and punctuation
    return text.trim().split(/\s+/).length;
  }
  
  