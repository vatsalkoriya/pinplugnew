import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const FAQ_QUESTIONS = [
  { text: "What services do you offer?", action: "/services" },
  { text: "View products", action: "/products" },
  { text: "How can I contact you?", action: "/contact" },
  { text: "What is Pinplug?", action: "/about" }
];

const SYSTEM_PROMPT = `You are a helpful customer support assistant for Pinplug Private Limited.
Pinplug provides precision electronics and professional integration for the modern home. 

Store Information:
- Address (Headquarters): Pinplug Private Limited, India
- Address (Store): Ganga Marg, CBI Phatak, Jagatpura, Jaipur, Rajasthan 302017
- Phone: 092568 41555 or +91 98765 43210
- Email: contact@pinplug.com
- Operating Hours: Open until 10 PM

We sell and service various home appliances including Air Conditioners, Refrigerators, Washing Machines, LED TVs, Geysers, and RO Systems.
Services provided: Repair & Maintenance, Smart Home Setup, and Technical Support.

You should ONLY answer questions related to our store location, contact details, the website, our products, our services, or general home appliance support. 
If the user asks an unrelated or useless question, politely decline to answer, state that you are a customer support bot for Pinplug, and offer to help them with queries related to our products, services, or store locations.
Keep your answers brief, professional, and helpful. Do not use overly complex formatting and try to sound like a human support agent.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi there! I am the Pinplug support assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // In a real application, you'd hide this key in your backend or use environment variables
      // But for this frontend implementation, we'll try to use the VITE_OPENROUTER_API_KEY environment variable.
      // If it's missing, we'll inform the user.
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

      if (!apiKey) {
         setMessages(prev => [...prev, { role: 'assistant', content: 'Please configure the VITE_OPENROUTER_API_KEY environment variable to enable AI responses.' }]);
         setIsLoading(false);
         return;
      }

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin, 
          'X-Title': 'Pinplug Chatbot',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            userMessage
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from OpenRouter API');
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting to my brain right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  const handleFAQClick = (faq: { text: string; action: string }) => {
    setMessages(prev => [...prev, { role: 'user', content: faq.text }]);
    if (faq.action.startsWith('/')) {
      navigate(faq.action);
      setMessages(prev => [...prev, { role: 'assistant', content: `I've redirected you to the ${faq.text.split(' ')[faq.text.split(' ').length -1 ]} page.` }]);
      setIsOpen(false);
    } else {
       handleSend(faq.text);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg p-0 hover:scale-110 transition-transform duration-200 z-50 bg-primary"
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[350px] h-[500px] shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-5">
      <CardHeader className="p-4 border-b bg-primary flex flex-row items-center justify-between rounded-t-xl text-primary-foreground">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Pinplug Support
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-primary-foreground hover:bg-primary/90">
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden relative flex flex-col">
        <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-muted text-foreground rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex w-full justify-start">
              <div className="bg-muted text-foreground rounded-2xl rounded-bl-sm p-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
        
        {messages.length === 1 && (
          <div className="px-4 pb-4 space-y-2">
            <p className="text-xs text-muted-foreground font-medium px-1">Common Questions</p>
            <div className="flex flex-wrap gap-2">
              {FAQ_QUESTIONS.map((faq, idx) => (
                <Button
                  key={idx}
                  variant="secondary"
                  size="sm"
                  className="text-xs py-1 h-auto"
                  onClick={() => handleFAQClick(faq)}
                >
                  {faq.text}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 border-t bg-background rounded-b-xl gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          onClick={() => handleSend(input)} 
          disabled={!input.trim() || isLoading}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
