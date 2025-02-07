import { useState } from 'react';

const GROQ_API_KEY = "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";
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enhancePromptWithGroq = async (prompt, template, creativity) => {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            { role: 'system', content: `You are an AI assistant that enhances prompts to make them more effective and tailored to specific writing tasks. The writing style is ${template}, and the creativity level is ${creativity * 100}%. Focus on clarity, specificity, and alignment with the chosen style.` },
            { role: 'user', content: `Enhance the following prompt for maximum effectiveness, considering the writing style and creativity level. Ensure the enhanced prompt is clear, specific, and well-structured: ${prompt}` }
          ],
          max_tokens: 500,
          temperature: creativity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to enhance prompt with Groq AI');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error enhancing prompt with Groq AI:', error);
      return prompt; // Return original prompt if enhancement fails
    }
  };

  const performAIAction = async (content, action, template, creativity) => {
    setIsLoading(true);
    setError(null);

    let prompt;
    switch (action) {
      case 'generate':
        prompt = `Generate content based on the following: ${content}`;
        break;
      case 'rephrase':
        prompt = `Rephrase the following content: ${content}`;
        break;
      case 'summarize':
        prompt = `Summarize the following content: ${content}`;
        break;
      case 'enhance':
        if (!template || creativity === undefined) {
          setError('Template and creativity level are required for enhance action');
          setIsLoading(false);
          return null;
        }
        prompt = await enhancePromptWithGroq(content, template, creativity);
        break;
      default:
        setError('Invalid action');
        setIsLoading(false);
        return null;
    }

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that performs various text operations.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.5,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to perform AI action');
      }

      const data = await response.json();
      setIsLoading(false);
      return data.choices[0].message.content;
    } catch (err) {
      console.error('Error performing AI action:', err);
      setError('Error performing AI action');
      setIsLoading(false);
      return null;
    }
  };

  return { performAIAction, isLoading, error };
};
