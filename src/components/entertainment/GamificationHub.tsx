import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award, Target, Clock, Users, Zap, ChevronRight, Play, CheckCircle } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  category: string;
}

interface Level {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  benefits: string[];
}

interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  questions: number;
  timeLimit: number;
  points: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  totalPoints: number;
  tasks: string[];
}

interface GamificationData {
  badges: Badge[];
  levels: Level[];
  quizzes: Quiz[];
  challenges: Challenge[];
  leaderboard: {
    categories: string[];
    metrics: string[];
  };
}

interface GamificationHubProps {
  userPoints: number;
  userLevel: string;
}

export const GamificationHub: React.FC<GamificationHubProps> = ({ userPoints, userLevel }) => {
  const [gamificationData, setGamificationData] = useState<GamificationData | null>(null);
  const [activeSection, setActiveSection] = useState<'overview' | 'badges' | 'quizzes' | 'challenges' | 'leaderboard'>('overview');
  const [earnedBadges, setEarnedBadges] = useState<Set<string>>(new Set(['explorer', 'culture-enthusiast']));
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load gamification data
    fetch('/data/gamification.json')
      .then(response => response.json())
      .then(data => setGamificationData(data))
      .catch(error => console.error('Error loading gamification data:', error));
  }, []);

  if (!gamificationData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-afriqar-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading achievements...</p>
        </div>
      </div>
    );
  }

  const currentLevel = gamificationData.levels.find(level => 
    userPoints >= level.minPoints && userPoints <= level.maxPoints
  ) || gamificationData.levels[0];

  const nextLevel = gamificationData.levels.find(level => level.level === currentLevel.level + 1);
  const progressToNext = nextLevel ? 
    ((userPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100 : 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-afriqar-primary mb-4">
          Achievement Hub
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Track your progress, earn badges, complete challenges, and compete with other heritage explorers. 
          Every interaction with Afriqar content helps you unlock new achievements and rewards.
        </p>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { id: 'overview', label: 'Overview', icon: Target },
            { id: 'badges', label: 'Badges', icon: Award },
            { id: 'quizzes', label: 'Quizzes', icon: Zap },
            { id: 'challenges', label: 'Challenges', icon: Trophy },
            { id: 'leaderboard', label: 'Leaderboard', icon: Users }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                activeSection === id
                  ? 'bg-afriqar-secondary text-white'
                  : 'text-gray-600 hover:bg-afriqar-green-light/20 hover:text-afriqar-secondary'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="space-y-8">
          {/* User Progress */}
          <div className="bg-gradient-to-r from-afriqar-secondary to-afriqar-accent rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Your Heritage Journey</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-medium">Level: {currentLevel.name}</span>
                      <span className="font-bold">{userPoints} points</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <div 
                        className="bg-yellow-300 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressToNext}%` }}
                      ></div>
                    </div>
                    {nextLevel && (
                      <p className="text-sm opacity-90 mt-2">
                        {nextLevel.minPoints - userPoints} points to {nextLevel.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-16 h-16" />
                </div>
                <h3 className="text-xl font-semibold">{earnedBadges.size} Badges Earned</h3>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Award className="w-8 h-8 text-afriqar-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-afriqar-primary">{earnedBadges.size}</div>
              <div className="text-gray-600">Badges Earned</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Zap className="w-8 h-8 text-afriqar-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-afriqar-primary">{completedQuizzes.size}</div>
              <div className="text-gray-600">Quizzes Completed</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Target className="w-8 h-8 text-afriqar-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-afriqar-primary">2</div>
              <div className="text-gray-600">Active Challenges</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Users className="w-8 h-8 text-afriqar-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-afriqar-primary">#47</div>
              <div className="text-gray-600">Global Rank</div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-afriqar-primary mb-6">Recent Achievements</h2>
            <div className="space-y-4">
              {Array.from(earnedBadges).slice(0, 3).map((badgeId) => {
                const badge = gamificationData.badges.find(b => b.id === badgeId);
                if (!badge) return null;
                return (
                  <div key={badge.id} className="flex items-center space-x-4 p-4 bg-afriqar-green-light/10 rounded-xl">
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-afriqar-primary">{badge.name}</h3>
                      <p className="text-gray-600 text-sm">{badge.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-afriqar-accent">+{badge.points}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Badges Section */}
      {activeSection === 'badges' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-afriqar-primary text-center">Achievement Badges</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gamificationData.badges.map((badge) => {
              const isEarned = earnedBadges.has(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all ${
                    isEarned 
                      ? 'border-afriqar-secondary bg-gradient-to-br from-white to-afriqar-green-light/10' 
                      : 'border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-6xl mb-4 ${isEarned ? '' : 'grayscale'}`}>
                      {badge.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-afriqar-primary mb-2">{badge.name}</h3>
                    <p className="text-gray-600 mb-4">{badge.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        isEarned 
                          ? 'bg-afriqar-secondary text-white' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {badge.category}
                      </span>
                      <div className="text-right">
                        <div className={`font-bold ${isEarned ? 'text-afriqar-accent' : 'text-gray-400'}`}>
                          {badge.points} pts
                        </div>
                        {isEarned && <CheckCircle className="w-5 h-5 text-green-500 mx-auto mt-1" />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quizzes Section */}
      {activeSection === 'quizzes' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-afriqar-primary text-center">Cultural Quizzes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gamificationData.quizzes.map((quiz) => {
              const isCompleted = completedQuizzes.has(quiz.id);
              return (
                <div key={quiz.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-afriqar-secondary/30">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-afriqar-primary">{quiz.title}</h3>
                    {isCompleted && <CheckCircle className="w-6 h-6 text-green-500" />}
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{quiz.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        quiz.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                        quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-medium">{quiz.questions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Time Limit:</span>
                      <span className="font-medium flex items-center">
                        <Clock size={12} className="mr-1" />
                        {Math.floor(quiz.timeLimit / 60)} min
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <div className="font-bold text-afriqar-accent">{quiz.points} points</div>
                    </div>
                    <button
                      onClick={() => {
                        if (!isCompleted) {
                          setCompletedQuizzes(new Set([...completedQuizzes, quiz.id]));
                        }
                      }}
                      disabled={isCompleted}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        isCompleted
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-afriqar-secondary text-white hover:bg-afriqar-green-dark'
                      }`}
                    >
                      <Play size={16} />
                      <span>{isCompleted ? 'Completed' : 'Start Quiz'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Challenges Section */}
      {activeSection === 'challenges' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-afriqar-primary text-center">Heritage Challenges</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {gamificationData.challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-afriqar-secondary/30 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-afriqar-primary mb-2">{challenge.title}</h3>
                    <p className="text-gray-600">{challenge.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-afriqar-accent text-xl">{challenge.totalPoints}</div>
                    <div className="text-sm text-gray-500">total points</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-500">2 of {challenge.tasks.length} tasks</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-afriqar-secondary h-2 rounded-full" 
                      style={{ width: `${(2 / challenge.tasks.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-afriqar-primary">Tasks:</h4>
                  {challenge.tasks.map((task, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle 
                        className={`w-5 h-5 mt-0.5 ${
                          index < 2 ? 'text-green-500' : 'text-gray-300'
                        }`} 
                      />
                      <span className={`text-sm ${
                        index < 2 ? 'text-gray-900 line-through' : 'text-gray-600'
                      }`}>
                        {task}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock size={14} className="mr-1" />
                    {challenge.duration}
                  </span>
                  <button className="px-6 py-2 bg-afriqar-accent text-white rounded-lg hover:bg-afriqar-blue-dark transition-colors">
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard Section */}
      {activeSection === 'leaderboard' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-afriqar-primary text-center">Community Leaderboard</h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex justify-center mb-8">
              <div className="flex space-x-4">
                <button className="px-6 py-2 bg-afriqar-secondary text-white rounded-lg">
                  This Week
                </button>
                <button className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  This Month
                </button>
                <button className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  All Time
                </button>
              </div>
            </div>

            {/* Top 3 */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { rank: 2, name: 'Amara K.', points: 2847, level: 'Heritage Guardian', avatar: '👩🏾' },
                { rank: 1, name: 'Kofi A.', points: 3156, level: 'Afriqar Master', avatar: '👨🏿' },
                { rank: 3, name: 'Zara M.', points: 2543, level: 'Cultural Ambassador', avatar: '👩🏽' }
              ].map((user) => (
                <div key={user.rank} className={`text-center p-6 rounded-2xl ${
                  user.rank === 1 
                    ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300' 
                    : user.rank === 2
                    ? 'bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300'
                    : 'bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-300'
                }`}>
                  <div className="text-4xl mb-2">{user.avatar}</div>
                  <div className={`text-2xl font-bold mb-1 ${
                    user.rank === 1 ? 'text-yellow-600' : 
                    user.rank === 2 ? 'text-gray-600' : 'text-orange-600'
                  }`}>
                    #{user.rank}
                  </div>
                  <h3 className="font-semibold text-afriqar-primary">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.level}</p>
                  <p className="font-bold text-afriqar-accent">{user.points} pts</p>
                </div>
              ))}
            </div>

            {/* Current User Position */}
            <div className="bg-afriqar-green-light/10 border border-afriqar-secondary/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">👤</div>
                  <div>
                    <h4 className="font-semibold text-afriqar-primary">You</h4>
                    <p className="text-sm text-gray-600">{userLevel}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-afriqar-primary">#47</div>
                  <div className="text-sm text-afriqar-accent">{userPoints} pts</div>
                </div>
              </div>
            </div>

            {/* Other Rankings */}
            <div className="space-y-3">
              {[
                { rank: 4, name: 'Fatima B.', points: 2341, level: 'Cultural Ambassador' },
                { rank: 5, name: 'Kwame O.', points: 2156, level: 'Cultural Ambassador' },
                { rank: 6, name: 'Aisha N.', points: 1987, level: 'Explorer' },
                { rank: 7, name: 'Chike E.', points: 1876, level: 'Explorer' },
                { rank: 8, name: 'Nana Y.', points: 1743, level: 'Explorer' }
              ].map((user) => (
                <div key={user.rank} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                      {user.rank}
                    </div>
                    <div>
                      <h4 className="font-medium text-afriqar-primary">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-afriqar-accent">{user.points} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
