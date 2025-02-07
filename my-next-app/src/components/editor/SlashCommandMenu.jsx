import React from 'react';
import { Menu } from '@headlessui/react';
import { Sparkles, Type, List, Table, Image, Code, CheckSquare, Zap } from 'lucide-react';

const SlashCommandMenu = ({ editor, onAIAction }) => {
  const items = [
    { name: 'AI Generate', icon: <Sparkles size={18} />, action: () => onAIAction('generate') },
    { name: 'AI Rephrase', icon: <Type size={18} />, action: () => onAIAction('rephrase') },
    { name: 'AI Summarize', icon: <List size={18} />, action: () => onAIAction('summarize') },
    { name: 'AI Enhance', icon: <Zap size={18} />, action: () => onAIAction('enhance') },
    { name: 'Insert Table', icon: <Table size={18} />, action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
    { name: 'Insert Image', icon: <Image size={18} />, action: () => {
      const url = window.prompt('Enter the URL of the image:');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }},
    { name: 'Insert Code Block', icon: <Code size={18} />, action: () => editor.chain().focus().toggleCodeBlock().run() },
    { name: 'Insert Todo List', icon: <CheckSquare size={18} />, action: () => editor.chain().focus().toggleTaskList().run() },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          /
        </Menu.Button>
      </div>
      <Menu.Items className="absolute z-10 w-64 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1 max-h-60 overflow-y-auto">
          {items.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={() => {
                    item.action();
                    editor.chain().focus().deleteRange({ from: editor.state.selection.from - 1, to: editor.state.selection.from }).run();
                  }}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default SlashCommandMenu;

