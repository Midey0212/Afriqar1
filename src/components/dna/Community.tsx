import React, { useState } from 'react';
import { MessageSquare, Users, Heart, Share2, MessageCircle, Plus, Search, Filter, Pin, Flag, Award, Clock, Eye } from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: string;
    badges: string[];
  };
  title: string;
  content: string;
  category: string;
  timestamp: string;
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
  isPinned?: boolean;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  posts: number;
  icon: string;
}

export const Community: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  const categories: Category[] = [
    { id: 'all', name: 'All Discussions', description: 'All community posts', posts: 1247, icon: '💬' },
    { id: 'heritage', name: 'Heritage Discovery', description: 'Share your ancestry findings', posts: 342, icon: '🌍' },
    { id: 'culture', name: 'Cultural Exchange', description: 'Discuss traditions and customs', posts: 298, icon: '🎭' },
    { id: 'genealogy', name: 'Genealogy Help', description: 'Family tree research assistance', posts: 189, icon: '🌳' },
    { id: 'stories', name: 'Family Stories', description: 'Share your family history', posts: 156, icon: '📖' },
    { id: 'language', name: 'Language Learning', description: 'African languages discussion', posts: 134, icon: '🗣️' },
    { id: 'travel', name: 'Heritage Travel', description: 'African travel experiences', posts: 98, icon: '✈️' },
    { id: 'recipes', name: 'Traditional Recipes', description: 'African cuisine and cooking', posts: 87, icon: '🍲' },
    { id: 'events', name: 'Community Events', description: 'Upcoming cultural events', posts: 76, icon: '📅' }
  ];

  const samplePosts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Amara Okafor',
        avatar: '/images/african-family.png',
        level: 'Heritage Guardian',
        badges: ['🌍', '🏆', '📚']
      },
      title: 'My DNA Results Revealed Surprising Yoruba Connections',
      content: 'Just got my DNA results back and discovered I have 34% Yoruba ancestry! My great-grandmother always told stories about our Nigerian roots, but seeing the scientific proof was incredibly emotional. Has anyone else had similar experiences with their DNA testing? I\'d love to connect with others who have Yoruba heritage.',
      category: 'heritage',
      timestamp: '2 hours ago',
      likes: 47,
      comments: 23,
      views: 312,
      isLiked: false,
      isPinned: true,
      tags: ['DNA', 'Yoruba', 'Nigeria', 'Ancestry']
    },
    {
      id: '2',
      author: {
        name: 'Kofi Asante',
        avatar: '/images/african-village.jpg',
        level: 'Cultural Ambassador',
        badges: ['🎭', '🥁', '🌟']
      },
      title: 'Traditional Kente Weaving Techniques - Learning from my Grandmother',
      content: 'Spent the weekend with my 89-year-old grandmother learning the traditional art of Kente weaving. Each pattern tells a story, and every color has deep cultural significance. I documented the process and would love to share it with the community. Who else is preserving traditional crafts?',
      category: 'culture',
      timestamp: '5 hours ago',
      likes: 89,
      comments: 34,
      views: 567,
      isLiked: true,
      tags: ['Kente', 'Ghana', 'Weaving', 'Traditions']
    },
    {
      id: '3',
      author: {
        name: 'Zara Mensah',
        avatar: '/images/african-patterns.jpg',
        level: 'Community Member',
        badges: ['💬']
      },
      title: 'Help with Family Tree Research - Akan Names',
      content: 'I\'m trying to trace my family history back to Ghana, specifically looking for information about traditional Akan naming conventions. My great-grandfather\'s name was Kwame, and I know this relates to the day he was born. Can anyone help me understand more about Akan day names and how they might help in genealogy research?',
      category: 'genealogy',
      timestamp: '1 day ago',
      likes: 23,
      comments: 18,
      views: 234,
      isLiked: false,
      tags: ['Akan', 'Ghana', 'Names', 'Genealogy']
    }
  ];

  const [posts] = useState<Post[]>(samplePosts);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.likes + b.comments) - (a.likes + b.comments);
      case 'trending':
        return b.views - a.views;
      default:
        return 0; // Keep original order for 'recent'
    }
  });

  return (
    <div className="space-y-8">
      {/* Community Header */}
      <div className="bg-gradient-to-r from-afriqar-secondary to-afriqar-accent rounded-2xl p-8 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Afriqar Community</h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-6">
            Connect with fellow heritage explorers, share your discoveries, ask questions, 
            and celebrate African culture together. Our community is moderated to ensure respectful and meaningful discussions.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-white text-afriqar-secondary rounded-xl hover:bg-gray-100 transition-colors font-semibold"
            >
              <Plus size={20} />
              <span>Create New Post</span>
            </button>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <Users className="w-8 h-8 text-afriqar-secondary mx-auto mb-2" />
          <div className="text-2xl font-bold text-afriqar-primary">15,847</div>
          <div className="text-gray-600">Community Members</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <MessageSquare className="w-8 h-8 text-afriqar-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-afriqar-primary">2,341</div>
          <div className="text-gray-600">Active Discussions</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-afriqar-primary">48,729</div>
          <div className="text-gray-600">Total Likes</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-afriqar-primary">892</div>
          <div className="text-gray-600">Heritage Guardians</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-afriqar-primary mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-afriqar-secondary text-white'
                      : 'hover:bg-afriqar-green-light/20 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{category.name}</div>
                        {activeCategory !== category.id && (
                          <div className="text-xs opacity-70">{category.posts} posts</div>
                        )}
                      </div>
                    </div>
                    {activeCategory !== category.id && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {category.posts}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
            <h3 className="text-lg font-bold text-afriqar-primary mb-4">Community Guidelines</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-afriqar-secondary">•</span>
                <span>Be respectful and inclusive to all members</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-afriqar-secondary">•</span>
                <span>Share accurate information and cite sources</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-afriqar-secondary">•</span>
                <span>Help others with their heritage journey</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-afriqar-secondary">•</span>
                <span>Celebrate diversity in African culture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search discussions, tags, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular' | 'trending')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {sortedPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl p-6 shadow-lg">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-afriqar-primary">{post.author.name}</h3>
                        <div className="flex space-x-1">
                          {post.author.badges.map((badge, index) => (
                            <span key={index} className="text-sm">{badge}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{post.author.level}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {post.isPinned && (
                      <Pin className="text-afriqar-accent" size={16} />
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Flag size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-afriqar-primary mb-3">{post.title}</h2>
                  <p className="text-gray-700 leading-relaxed">{post.content}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-afriqar-green-light/20 text-afriqar-secondary text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        post.isLiked
                          ? 'text-red-500 bg-red-50'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Heart size={18} className={post.isLiked ? 'fill-current' : ''} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                      <MessageCircle size={18} />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                      <Share2 size={18} />
                      <span>Share</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Eye size={16} />
                    <span>{post.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedPosts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No posts found</h3>
              <p className="text-gray-400">Try adjusting your search criteria or create a new post to start the conversation.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCreatePost(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-bold text-afriqar-primary mb-6">Create New Post</h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent">
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
                  placeholder="Enter your post title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
                  placeholder="Share your thoughts, questions, or discoveries..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
                  placeholder="DNA, Yoruba, Heritage, Family..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreatePost(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-afriqar-secondary text-white rounded-lg hover:bg-afriqar-green-dark transition-colors"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
