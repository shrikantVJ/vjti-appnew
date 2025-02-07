import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { formatTime } from '@/utils/formatTime'



export function ChatMessage({ user, content, timestamp, initialReactions = [] }) {
  const [reactions, setReactions] = useState(initialReactions);

  const addReaction = (emoji) => {
    setReactions(prev => {
      const existing = prev.find(r => r.emoji === emoji);
      if (existing) {
        return prev.map(r => r.emoji === emoji ? { ...r, count: r.count + 1 } : r);
      } else {
        return [...prev, { emoji, count: 1 }];
      }
    });
  };

  return (
    <div className="flex items-start space-x-4 mb-4">
      <Avatar className="w-10 h-10">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-semibold mr-2">{user.name}</span>
          <span className="text-xs text-gray-500">{formatTime(timestamp)}</span>
        </div>
        <p className="text-sm mb-2">{content}</p>
        <div className="flex flex-wrap gap-2">
          {reactions.map((reaction, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs py-0 h-6"
              onClick={() => addReaction(reaction.emoji)}
            >
              {reaction.emoji} {reaction.count}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="text-xs py-0 h-6"
            onClick={() => addReaction('👍')}
          >
            Add Reaction
          </Button>
        </div>
      </div>
    </div>
  );
}

