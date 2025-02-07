'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import usePromptStore from '@/hooks/store'
import { simpleTokenCount } from '@/hooks/tokenizer'
import { enhancePromptWithGroq } from '@/hooks/groqAI'
import { toast, Toaster } from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Clipboard, Check, Trash2, RefreshCw, Loader2 } from 'lucide-react'

const schema = yup.object({
  inputPrompt: yup.string().required('Input prompt is required'),
  category: yup.string().required('Category is required'),
  tags: yup.string().required('At least one tag is required'),
}).required()

const promptTemplates = {
  default: 'General purpose',
  formal: 'Formal business communication',
  creative: 'Creative and engaging writing',
  technical: 'Detailed technical explanation',
  persuasive: 'Persuasive argument or proposal',
}

export default function EnhancedPromptOptimizer() {
  const [optimizedPrompt, setOptimizedPrompt] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('default')
  const [tokenCount, setTokenCount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [creativity, setCreativity] = useState(0.5)
  const [useGroqAI, setUseGroqAI] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { prompts, addPrompt, removePrompt, clearHistory } = usePromptStore()

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      inputPrompt: '',
      category: 'general',
      tags: '',
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      let enhancedPrompt = data.inputPrompt
      if (useGroqAI) {
        enhancedPrompt = await enhancePromptWithGroq(data.inputPrompt, promptTemplates[selectedTemplate], creativity)
      }
      setOptimizedPrompt(enhancedPrompt)
      setTokenCount(simpleTokenCount(enhancedPrompt))
      const newPrompt = {
        id: Date.now().toString(),
        input: data.inputPrompt,
        optimized: enhancedPrompt,
        category: data.category,
        tags: data.tags.split(',').map(tag => tag.trim()),
        template: selectedTemplate,
      }
      addPrompt(newPrompt)
      toast.success('Prompt optimized and saved!')
      reset()
    } catch (error) {
      console.error('Error optimizing prompt:', error)
      toast.error('Failed to optimize prompt. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(optimizedPrompt).then(() => {
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const deletePrompt = (id) => {
    removePrompt(id)
    toast.success('Prompt deleted!')
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <Toaster position="top-right" />
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6">
        <CardTitle className="text-2xl font-bold">AI-Powered Prompt Optimizer</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="inputPrompt" className="text-lg font-medium text-gray-700">Input Prompt</Label>
            <Controller
              name="inputPrompt"
              control={control}
              render={({ field }) => <Textarea {...field} id="inputPrompt" placeholder="Enter your initial prompt here..." rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />}
            />
            {errors.inputPrompt && <p className="mt-1 text-sm text-red-600">{errors.inputPrompt.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
            </div>
            <div>
              <Label htmlFor="tags" className="text-sm font-medium text-gray-700">Tags (comma-separated)</Label>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => <Input {...field} id="tags" placeholder="Enter tags..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />}
              />
              {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="template" className="text-sm font-medium text-gray-700">Writing Style</Label>
            <Select onValueChange={setSelectedTemplate} defaultValue={selectedTemplate}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select a writing style" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(promptTemplates).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="creativity" className="text-sm font-medium text-gray-700">Creativity Level</Label>
              <span className="text-sm text-gray-500">{Math.round(creativity * 100)}%</span>
            </div>
            <Slider
              id="creativity"
              min={0}
              max={1}
              step={0.1}
              value={[creativity]}
              onValueChange={(value) => setCreativity(value[0])}
              className="w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="use-groq-ai"
              checked={useGroqAI}
              onCheckedChange={setUseGroqAI}
            />
            <Label htmlFor="use-groq-ai" className="text-sm font-medium text-gray-700">Use Groq AI Enhancement</Label>
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              'Optimize Prompt'
            )}
          </Button>
        </form>
        {optimizedPrompt && (
          <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Optimized Prompt</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Tokens: {tokenCount}</span>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {optimizedPrompt}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-200 p-6">
        <div className="w-full space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Prompt History</h3>
          {prompts.length === 0 ? (
            <p className="text-center text-gray-500">No prompts in history yet.</p>
          ) : (
            <div className="space-y-4">
              {prompts.map((prompt) => (
                <Card key={prompt.id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{prompt.category} - {promptTemplates[prompt.template]}</p>
                        <p className="text-xs text-gray-500 mt-1">{prompt.input.substring(0, 100)}...</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setOptimizedPrompt(prompt.optimized)
                            setTokenCount(simpleTokenCount(prompt.optimized))
                          }}
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deletePrompt(prompt.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {prompt.tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {prompts.length > 0 && (
            <Button variant="outline" className="w-full" onClick={clearHistory}>
              Clear All History
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

