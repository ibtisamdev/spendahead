"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Bot,
  User,
  Send,
  Sparkles,
  Mic,
  Paperclip,
  MoreVertical,
  TrendingUp,
  Target,
  PieChart,
  CreditCard,
  Lightbulb,
  AlertTriangle,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  isTyping?: boolean
  suggestions?: string[]
  quickActions?: QuickAction[]
  charts?: ChartData[]
}

interface QuickAction {
  label: string
  action: string
  icon: React.ReactNode
  gradient: string
}

interface ChartData {
  type: "spending" | "budget" | "trend"
  title: string
  data: any
}

const conversationStarters = [
  {
    category: "Spending Analysis",
    icon: <PieChart className="h-5 w-5" />,
    gradient: "from-blue-500 to-indigo-500",
    questions: [
      "What's my biggest expense category this month?",
      "How much did I spend on dining out?",
      "Show me my spending trends",
      "Compare this month to last month",
    ],
  },
  {
    category: "Budget Management",
    icon: <Target className="h-5 w-5" />,
    gradient: "from-green-500 to-emerald-500",
    questions: [
      "Am I on track with my budgets?",
      "Which budgets am I overspending?",
      "Help me create a new budget",
      "Show my budget performance",
    ],
  },
  {
    category: "Financial Insights",
    icon: <TrendingUp className="h-5 w-5" />,
    gradient: "from-purple-500 to-violet-500",
    questions: [
      "What are my spending patterns?",
      "How can I save more money?",
      "Analyze my financial health",
      "Give me personalized tips",
    ],
  },
  {
    category: "Quick Actions",
    icon: <Lightbulb className="h-5 w-5" />,
    gradient: "from-orange-500 to-red-500",
    questions: [
      "Add a new transaction",
      "Set up a budget alert",
      "Export my spending report",
      "Schedule a savings goal",
    ],
  },
]

const quickActionButtons = [
  {
    label: "Add Transaction",
    action: "add_transaction",
    icon: <CreditCard className="h-4 w-4" />,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    label: "Check Budget",
    action: "check_budget",
    icon: <Target className="h-4 w-4" />,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    label: "Spending Report",
    action: "spending_report",
    icon: <TrendingUp className="h-4 w-4" />,
    gradient: "from-purple-500 to-violet-500",
  },
  {
    label: "Save Money Tips",
    action: "save_tips",
    icon: <Lightbulb className="h-4 w-4" />,
    gradient: "from-orange-500 to-red-500",
  },
]

const initialMessages: Message[] = [
  {
    id: "1",
    type: "ai",
    content:
      "👋 Hello! I'm your AI financial assistant. I can help you analyze your spending, manage budgets, track goals, and provide personalized financial insights. What would you like to explore today?",
    timestamp: new Date(),
    quickActions: quickActionButtons,
    suggestions: [
      "Show me my spending summary",
      "How am I doing with my budgets?",
      "What are my top expenses?",
      "Give me money-saving tips",
    ],
  },
]

export function AIAssistantChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputValue
    if (!messageContent.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageContent,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI typing
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageContent)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("spending") || lowerMessage.includes("expense")) {
      return {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "📊 Here's your spending analysis:\n\n• **Food & Dining**: $450 (35% of budget)\n• **Transportation**: $180 (60% of budget)\n• **Shopping**: $280 (70% of budget)\n• **Entertainment**: $120 (60% of budget)\n\n💡 **Insight**: You're spending 15% more on dining compared to last month. Consider meal planning to reduce costs.",
        timestamp: new Date(),
        suggestions: [
          "Show me dining expense details",
          "How can I reduce food costs?",
          "Set a dining budget alert",
          "Compare to previous months",
        ],
        quickActions: [
          {
            label: "Set Budget Alert",
            action: "set_alert",
            icon: <AlertTriangle className="h-4 w-4" />,
            gradient: "from-red-500 to-rose-500",
          },
          {
            label: "View Details",
            action: "view_details",
            icon: <PieChart className="h-4 w-4" />,
            gradient: "from-blue-500 to-indigo-500",
          },
        ],
      }
    }

    if (lowerMessage.includes("budget")) {
      return {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "🎯 **Budget Performance Summary**:\n\n✅ **On Track** (3 categories):\n• Transportation: $180/$300 (60%)\n• Entertainment: $120/$200 (60%)\n• Health: $45/$100 (45%)\n\n⚠️ **Attention Needed** (2 categories):\n• Food & Dining: $450/$600 (75%)\n• Shopping: $280/$400 (70%)\n\n🏆 **Overall**: You're doing great! 81% budget efficiency this month.",
        timestamp: new Date(),
        suggestions: [
          "How can I improve my budget efficiency?",
          "Set up budget alerts",
          "Reallocate budget amounts",
          "View budget history",
        ],
      }
    }

    if (lowerMessage.includes("save") || lowerMessage.includes("tip")) {
      return {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "💰 **Personalized Money-Saving Tips**:\n\n🍽️ **Dining** (Potential savings: $150/month):\n• Cook 2 more meals at home per week\n• Use grocery store loyalty programs\n• Try meal planning apps\n\n🛍️ **Shopping** (Potential savings: $80/month):\n• Wait 24 hours before non-essential purchases\n• Use price comparison tools\n• Shop with a list to avoid impulse buys\n\n🎬 **Subscriptions** (Potential savings: $45/month):\n• Cancel unused streaming services\n• Share family plans with relatives\n• Look for annual payment discounts",
        timestamp: new Date(),
        suggestions: [
          "Help me create a meal plan",
          "Show subscription analysis",
          "Set up savings goals",
          "Track my progress",
        ],
      }
    }

    // Default response
    return {
      id: (Date.now() + 1).toString(),
      type: "ai",
      content:
        "I'm here to help you with your finances! I can analyze your spending patterns, help manage budgets, provide personalized insights, and answer any questions about your financial data. What specific area would you like to explore?",
      timestamp: new Date(),
      suggestions: [
        "Analyze my spending patterns",
        "Check my budget status",
        "Show me money-saving opportunities",
        "Help me set financial goals",
      ],
    }
  }

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      add_transaction: "Help me add a new transaction",
      check_budget: "Show me my current budget status",
      spending_report: "Generate my spending report",
      save_tips: "Give me personalized money-saving tips",
      set_alert: "Set up a budget alert for dining expenses",
      view_details: "Show me detailed spending breakdown",
    }

    if (actionMessages[action]) {
      handleSendMessage(actionMessages[action])
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            AI Financial Assistant
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            Get personalized insights and manage your finances with AI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="status-success font-semibold">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
            Online
          </Badge>
        </div>
      </div>

      <div className="flex-1 grid gap-6 lg:grid-cols-4">
        {/* Conversation Starters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="section-card h-full">
            <CardHeader className="section-header">
              <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent className="section-content">
              <div className="space-y-4">
                {conversationStarters.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <div
                      className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${category.gradient} text-white shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300`}
                      onClick={() =>
                        setSelectedCategory(selectedCategory === category.category ? null : category.category)
                      }
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        {category.icon}
                      </div>
                      <span className="font-semibold text-sm">{category.category}</span>
                    </div>
                    {selectedCategory === category.category && (
                      <div className="space-y-2 ml-4">
                        {category.questions.map((question, qIndex) => (
                          <Button
                            key={qIndex}
                            variant="ghost"
                            className="w-full justify-start text-left h-auto p-3 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-all duration-300"
                            onClick={() => handleSendMessage(question)}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="section-card h-full flex flex-col">
            <CardHeader className="section-header flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 section-title">
                  <Avatar className="h-10 w-10 rounded-2xl shadow-lg">
                    <AvatarFallback className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-black">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  Financial AI Assistant
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="rounded-xl">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="rounded-xl">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem>Clear conversation</DropdownMenuItem>
                      <DropdownMenuItem>Export chat</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.type === "ai" && (
                        <Avatar className="h-10 w-10 rounded-2xl shadow-lg flex-shrink-0">
                          <AvatarFallback className="rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 text-white font-black">
                            <Bot className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div className={`max-w-[85%] space-y-3 ${message.type === "user" ? "items-end" : "items-start"}`}>
                        <div
                          className={`p-4 rounded-2xl shadow-lg backdrop-blur-sm relative group ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
                              : "bg-white/90 text-gray-900 border border-gray-200/60"
                          }`}
                        >
                          <div className="whitespace-pre-wrap leading-relaxed font-medium">{message.content}</div>

                          {/* Message Actions */}
                          {message.type === "ai" && (
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 hover:bg-gray-100 rounded-lg"
                                  onClick={() => copyMessage(message.content)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100 rounded-lg">
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100 rounded-lg">
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )}

                          <div
                            className={`text-xs mt-2 ${message.type === "user" ? "text-gray-300" : "text-gray-500"}`}
                          >
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        {message.quickActions && (
                          <div className="flex flex-wrap gap-2">
                            {message.quickActions.map((action, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className={`bg-gradient-to-r ${action.gradient} text-white border-0 hover:opacity-90 font-semibold shadow-lg hover:scale-105 transition-all duration-300`}
                                onClick={() => handleQuickAction(action.action)}
                              >
                                {action.icon}
                                <span className="ml-2">{action.label}</span>
                              </Button>
                            ))}
                          </div>
                        )}

                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-medium border border-gray-200/60 hover:scale-105 transition-all duration-300"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>

                      {message.type === "user" && (
                        <Avatar className="h-10 w-10 rounded-2xl shadow-lg flex-shrink-0">
                          <AvatarFallback className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white font-black">
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-4 justify-start">
                      <Avatar className="h-10 w-10 rounded-2xl shadow-lg flex-shrink-0">
                        <AvatarFallback className="rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 text-white font-black">
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-white/90 text-gray-900 border border-gray-200/60 p-4 rounded-2xl shadow-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                          <span className="text-sm text-gray-500 font-medium">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-200/60 bg-gray-50/80 backdrop-blur-sm">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask me anything about your finances..."
                      onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                      className="h-12 pr-20 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                      disabled={isTyping}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-100 rounded-lg"
                        disabled={isTyping}
                      >
                        <Paperclip className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-100 rounded-lg"
                        disabled={isTyping}
                      >
                        <Mic className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSendMessage()}
                    className="btn-primary h-12 px-6"
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {quickActionButtons.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="bg-white/80 backdrop-blur-sm border-gray-300/60 text-gray-700 hover:bg-gray-50/80 font-medium rounded-xl hover:scale-105 transition-all duration-300"
                      onClick={() => handleQuickAction(action.action)}
                      disabled={isTyping}
                    >
                      {action.icon}
                      <span className="ml-2">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
