import { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus, 
  Search, 
  User, 
  Home, 
  Bell, 
  BookOpen, 
  Users, 
  MapPin, 
  Clock, 
  Reply, 
  MoreHorizontal, 
  Smile, 
  Edit2, 
  Camera, 
  Save, 
  X, 
  ArrowUpDown, 
  Bookmark, 
  UserCheck, 
  Globe, 
  Settings 
} from 'lucide-react';

const ForumApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [userProfile, setUserProfile] = useState({
    nickname: '',
    introduction: '',
    location: '',
    children: [],
    interests: [],
    joinDate: '2025年6月',
    postCount: 0,
    helpfulCount: 0
  });

  const [tempProfile, setTempProfile] = useState({...userProfile});
  const [posts, setPosts] = useState([]);

  const [newPost, setNewPost] = useState({
    category: '療育',
    title: '',
    content: '',
    tags: ''
  });

  const [searchFilters, setSearchFilters] = useState({
    category: 'all',
    age: 'all',
    sortBy: 'recent'
  });

  const localGroups = [
    {
      id: 'tokyo-shibuya',
      name: '東京都渋谷区',
      description: '渋谷区在住の発達障害児保護者のグループです',
      memberCount: 48,
      recentPosts: 12,
      tags: ['療育施設情報', '学校情報', 'おすすめスポット']
    },
    {
      id: 'tokyo-setagaya',
      name: '東京都世田谷区',
      description: '世田谷区の発達支援情報を共有しましょう',
      memberCount: 72,
      recentPosts: 18,
      tags: ['特別支援学校', '放課後デイ', '医療機関']
    },
    {
      id: 'osaka-namba',
      name: '大阪府大阪市',
      description: '大阪市内の発達障害児保護者コミュニティ',
      memberCount: 65,
      recentPosts: 15,
      tags: ['療育情報', '学校選び', 'イベント']
    },
    {
      id: 'kanagawa-yokohama',
      name: '神奈川県横浜市',
      description: '横浜市の療育・教育情報交換グループ',
      memberCount: 58,
      recentPosts: 10,
      tags: ['療育手帳', '就学相談', '医療費助成']
    }
  ];

  const categories = [
    { id: 'all', name: 'すべて', icon: Home },
    { id: '療育', name: '療育', icon: BookOpen },
    { id: '学校生活', name: '学校生活', icon: Users },
    { id: '家庭生活', name: '家庭生活', icon: Heart },
    { id: '医療', name: '医療', icon: Plus },
    { id: '地域情報', name: '地域情報', icon: MapPin }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const getBookmarkedPosts = () => {
    return posts.filter(post => bookmarks.includes(post.id));
  };

  const getJoinedGroups = () => {
    return localGroups.filter(group => joinedGroups.includes(group.id));
  };

  const getUnreadNotificationCount = () => {
    return notifications.filter(n => !n.isRead).length;
  };

  const handleLikePost = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
    
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(updatedPosts.find(p => p.id === postId));
    }
  };

  const handleEmpathyPost = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, empathy: post.empathy + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
    
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(updatedPosts.find(p => p.id === postId));
    }
  };

  const handleBookmark = (postId) => {
    if (bookmarks.includes(postId)) {
      setBookmarks(bookmarks.filter(id => id !== postId));
    } else {
      setBookmarks([...bookmarks, postId]);
    }
  };

  const handleJoinGroup = (groupId) => {
    if (joinedGroups.includes(groupId)) {
      setJoinedGroups(joinedGroups.filter(id => id !== groupId));
    } else {
      setJoinedGroups([...joinedGroups, groupId]);
    }
  };

  const handleSubmitPost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        author: userProfile.nickname || 'ユーザー',
        category: newPost.category,
        title: newPost.title,
        content: newPost.content,
        time: 'たった今',
        likes: 0,
        empathy: 0,
        replies: 0,
        tags: newPost.tags ? newPost.tags.split(',').map(tag => tag.trim()) : [],
        repliesData: []
      };
      setPosts([post, ...posts]);
      setNewPost({ category: '療育', title: '', content: '', tags: '' });
      setShowNewPost(false);
      
      setUserProfile({
        ...userProfile,
        postCount: userProfile.postCount + 1
      });
    }
  };

  const PostCard = ({ post }) => (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">{post.author}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span className={`px-2 py-1 rounded-full text-xs ${
                post.category === '療育' ? 'bg-green-100 text-green-700' :
                post.category === '学校生活' ? 'bg-purple-100 text-purple-700' :
                post.category === '家庭生活' ? 'bg-pink-100 text-pink-700' :
                post.category === '医療' ? 'bg-red-100 text-red-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {post.category}
              </span>
              <Clock className="w-3 h-3" />
              <span>{post.time}</span>
            </div>
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-400" />
      </div>
      
      <h3 className="font-medium text-gray-900 mb-2 leading-relaxed">{post.title}</h3>
      <p className="text-gray-700 text-sm leading-relaxed mb-3">{post.content}</p>
      
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => handleLikePost(post.id)}
            className="flex items-center space-x-1 text-gray-500 hover:text-pink-500 transition-colors"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button 
            onClick={() => handleEmpathyPost(post.id)}
            className="flex items-center space-x-1 text-gray-500 hover:text-orange-500 transition-colors"
          >
            <Smile className="w-4 h-4" />
            <span className="text-sm">{post.empathy}</span>
            <span className="text-xs text-gray-400">わかる</span>
          </button>
          <button 
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
            onClick={() => {
              setSelectedPost(post);
              setCurrentView('thread');
            }}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{post.replies}</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleBookmark(post.id)}
            className={`transition-colors ${
              bookmarks.includes(post.id) 
                ? 'text-yellow-500 hover:text-yellow-600' 
                : 'text-gray-500 hover:text-yellow-500'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarks.includes(post.id) ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );

  // Notifications View
  if (showNotifications) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowNotifications(false)}
              className="text-blue-600"
            >
              ← 戻る
            </button>
            <h1 className="font-bold text-lg text-gray-900">通知</h1>
            <div className="w-6"></div>
          </div>
        </div>

        <div className="p-4">
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">通知はありません</h3>
            <p className="text-sm text-gray-500">
              新しい返信やいいねがあると<br />ここに表示されます
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Groups View
  if (showGroups) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowGroups(false)}
              className="text-blue-600"
            >
              ← 戻る
            </button>
            <h1 className="font-bold text-lg text-gray-900">地域グループ</h1>
            <div className="w-6"></div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">参加可能なグループ</h3>
          {localGroups.map(group => (
            <div key={group.id} className="bg-white rounded-lg shadow-sm border p-4 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <h4 className="font-medium text-gray-900">{group.name}</h4>
                </div>
                <button
                  onClick={() => handleJoinGroup(group.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    joinedGroups.includes(group.id)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {joinedGroups.includes(group.id) ? '参加中' : '参加'}
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{group.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {group.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{group.memberCount}人のメンバー</span>
                <span>今月{group.recentPosts}投稿</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Bookmarks View
  if (showBookmarks) {
    const bookmarkedPosts = getBookmarkedPosts();
    
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowBookmarks(false)}
              className="text-blue-600"
            >
              ← 戻る
            </button>
            <h1 className="font-bold text-lg text-gray-900">ブックマーク</h1>
            <div className="w-6"></div>
          </div>
        </div>

        <div className="p-4">
          {bookmarkedPosts.length > 0 ? (
            bookmarkedPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">ブックマークがありません</h3>
              <p className="text-sm text-gray-500 mb-6">
                参考になった投稿をブックマークして<br />後で見返すことができます
              </p>
              <button
                onClick={() => setShowBookmarks(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                投稿を見る
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Search View
  if (showSearch) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowSearch(false)}
              className="text-blue-600"
            >
              ← 戻る
            </button>
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="キーワード、タグ、ユーザー名で検索..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="text-center py-8">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">投稿を検索</h3>
            <p className="text-sm text-gray-500 mb-4">
              キーワード、タグ、ユーザー名で投稿を探せます
            </p>
            
            <div className="text-left">
              <h4 className="text-sm font-medium text-gray-700 mb-2">人気のタグ</h4>
              <div className="flex flex-wrap gap-2">
                {['言語療法', '癇癪', '特別支援学級', '作業療法', '発達遅延', '感覚統合'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Profile View
  if (showProfile) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowProfile(false)}
              className="text-blue-600"
            >
              ← 戻る
            </button>
            <h1 className="font-bold text-lg text-gray-900">プロフィール</h1>
            <button 
              onClick={() => setEditingProfile(!editingProfile)}
              className="text-blue-600"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">
                  {userProfile.nickname || 'ニックネームを設定してください'}
                </h2>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                  <span>参加: {userProfile.joinDate}</span>
                  <span>投稿: {userProfile.postCount}</span>
                </div>
              </div>
            </div>

            {editingProfile && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ニックネーム</label>
                  <input
                    type="text"
                    value={userProfile.nickname}
                    onChange={(e) => setUserProfile({...userProfile, nickname: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="ニックネームを入力"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">自己紹介</label>
                  <textarea
                    value={userProfile.introduction}
                    onChange={(e) => setUserProfile({...userProfile, introduction: e.target.value})}
                    placeholder="自己紹介を書いてください..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // New Post View
  if (showNewPost) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowNewPost(false)}
              className="text-blue-600 font-medium"
            >
              キャンセル
            </button>
            <h1 className="font-bold text-lg text-gray-900">新規投稿</h1>
            <button 
              onClick={handleSubmitPost}
              className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium"
            >
              投稿
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリ</label>
              <select 
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.slice(1).map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder="タイトルを入力してください"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                placeholder="相談内容や体験談を詳しく書いてください"
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">タグ（カンマ区切り）</label>
              <input
                type="text"
                value={newPost.tags}
                onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                placeholder="例: 3歳, 言語療法, 発達遅延"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Home View (default)
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl text-gray-900">Family Support Forum</h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowSearch(true)}
              className="p-1"
            >
              <Search className="w-6 h-6 text-gray-600" />
            </button>
            <button 
              onClick={() => setShowNotifications(true)}
              className="p-1 relative"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {getUnreadNotificationCount() > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getUnreadNotificationCount()}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map(category => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts */}
      <div className="flex-1 p-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">投稿がありません</h3>
            <p className="text-sm text-gray-500 mb-6">
              最初の投稿をして<br />コミュニティを始めませんか？
            </p>
            <button
              onClick={() => setShowNewPost(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              投稿する
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowNewPost(true)}
        className="fixed bottom-20 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors z-50"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom Navigation */}
      <div className="bg-white border-t px-4 py-2 fixed bottom-0 left-0 right-0">
        <div className="flex justify-around">
          {[
            { icon: Home, label: 'ホーム', active: !showProfile && !showSearch && !showBookmarks && !showGroups && !showNotifications, view: 'home' },
            { icon: MapPin, label: '地域', active: showGroups, view: 'groups' },
            { icon: Bookmark, label: 'ブックマーク', active: showBookmarks, view: 'bookmarks' },
            { icon: BookOpen, label: 'リソース', active: false, view: 'resources' },
            { icon: User, label: 'プロフィール', active: showProfile, view: 'profile' }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  if (item.view === 'profile') {
                    setShowProfile(true);
                    setShowBookmarks(false);
                    setShowSearch(false);
                    setShowGroups(false);
                    setShowNotifications(false);
                  } else if (item.view === 'bookmarks') {
                    setShowBookmarks(true);
                    setShowProfile(false);
                    setShowSearch(false);
                    setShowGroups(false);
                    setShowNotifications(false);
                  } else if (item.view === 'groups') {
                    setShowGroups(true);
                    setShowProfile(false);
                    setShowSearch(false);
                    setShowBookmarks(false);
                    setShowNotifications(false);
                  } else if (item.view === 'home') {
                    setCurrentView('home');
                    setShowProfile(false);
                    setShowSearch(false);
                    setShowBookmarks(false);
                    setShowGroups(false);
                    setShowNotifications(false);
                  }
                }}
                className={`flex flex-col items-center py-2 px-3 ${
                  item.active ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                <IconComponent className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ForumApp;