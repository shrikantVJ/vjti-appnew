import { useState } from 'react';

const GROQ_API_KEY = "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"
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export function useGroqAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSubtasks = async (taskDescription) => {
    setIsLoading(true);
    setError(null);
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
            { role: 'system', content: 'You are an AI assistant that breaks down tasks into specific, actionable subtasks.' },
            { role: 'user', content: `Given the following task description, break it down into a list of 5-8 specific, actionable subtasks. Provide the subtasks as a JSON array of strings,it should 4-6 words: ${taskDescription}` }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate subtasks with Groq AI: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Attempt to parse the content as JSON
      let subtasksJson;
      try {
        subtasksJson = JSON.parse(content);
      } catch (parseError) {
        console.error('Error parsing Groq AI response:', parseError);
        console.log('Raw response:', content);
        
        // Attempt to extract a JSON array from the response
        const jsonArrayMatch = content.match(/\[[\s\S]*\]/);
        if (jsonArrayMatch) {
          try {
            subtasksJson = JSON.parse(jsonArrayMatch[0]);
          } catch (extractError) {
            console.error('Error extracting JSON array from response:', extractError);
            throw new Error('Failed to parse subtasks from Groq AI response');
          }
        } else {
          throw new Error('Failed to extract subtasks from Groq AI response');
        }
      }

      if (!Array.isArray(subtasksJson)) {
        throw new Error('Groq AI response is not an array of subtasks');
      }

      return subtasksJson.map((subtask, index) => ({ id: index, title: subtask, completed: false }));
    } catch (error) {
      console.error('Error generating subtasks with Groq AI:', error);
      setError(error.message || "Failed to generate subtasks. Please try again later.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { generateSubtasks, isLoading, error };
}

