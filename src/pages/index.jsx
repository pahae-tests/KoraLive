import React, { useState, useEffect } from 'react';
import { Heart, Users, Sparkles, Play, Clock, Trophy } from 'lucide-react';

const MatchesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Récupération des données depuis l'API scrape
    const fetchMatches = async () => {
      try {
        const res = await fetch('/api/home');
        const data = await res.json();
        if (data.matches) {
          setMatches(data.matches);
          console.log(data.matches)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des matchs :', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const goToMatch = (matchId) => {
    window.location.href = `/Match?id=${matchId}`;
  };

  const LiveIndicator = () => (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
      <span className="text-green-400 font-bold text-sm">LIVE</span>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen p-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 pt-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-pink-500" />
              <h1 className="text-3xl font-bold text-white">المباريات اليوم</h1>
              <Trophy className="w-8 h-8 text-pink-500" />
            </div>
            <p className="text-gray-400 text-lg">
              تابع أهم المباريات والأحداث الرياضية ✨
            </p>
          </div>

          {/* Loading Animation */}
          <div className="bg-gray-950/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl p-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-16 h-16 text-white animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                جاري التحميل...
              </h2>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-500/30 rounded-full px-6 py-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="text-white font-medium">تحميل المباريات...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 " dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-pink-500" />
            <h1 className="text-3xl font-bold text-white">المباريات اليوم</h1>
            <Trophy className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-gray-400 text-lg">
            تابع أهم المباريات والأحداث الرياضية ✨
          </p>
        </div>

        {/* Matches Container */}
        <div className="space-y-6">
          {matches.map((match) => (
            <div
              key={match._id}
              className="group bg-gray-950/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-pink-500/25 cursor-pointer relative"
              onClick={() => goToMatch(match._id)}
            >
              {/* Match Content */}
              <div className="p-6 flex items-center justify-between">
                {/* Team 1 */}
                <div className="flex flex-col items-center text-center flex-1">
                  <a
                    href={`/team/${match.team1.name}`}
                    className="hover:scale-110 transition-transform duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={match.team1.logo}
                      alt={match.team1.name}
                      className="w-16 h-16 object-contain mb-2"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGRjAwN0YiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+CjwvZz4KPC9zdmc+';
                      }}
                    />
                  </a>
                  <h3 className="text-white font-bold text-sm">{match.team1.name}</h3>
                </div>

                {/* Match Info */}
                <div className="flex flex-col items-center text-center px-6 text-xs md:text-lg">
                  {/* Time or Live Indicator */}
                  <div className="mb-2">
                    {match.status === 'جارية الان' ? (
                      <LiveIndicator />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 font-medium">{match.time}</span>
                        <span className="text-white px-2 py-1 font-medium">{match.status}</span>
                      </div>
                    )}
                  </div>

                  {/* Score */}
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-white">
                      {match.score}
                    </span>
                  </div>

                  {/* League */}
                  <div className="bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs">
                    {match.league}
                  </div>
                </div>

                {/* Team 2 */}
                <div className="flex flex-col items-center text-center flex-1">
                  <a
                    href={`/team/${match.team2.name}`}
                    className="hover:scale-110 transition-transform duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={match.team2.logo}
                      alt={match.team2.name}
                      className="w-16 h-16 object-contain mb-2"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiMwMDdGRkYiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+CjwvZz4KPC9zdmc+';
                      }}
                    />
                  </a>
                  <h3 className="text-white font-bold text-sm">{match.team2.name}</h3>
                </div>
              </div>

              {/* Play Button Overlay - Shows on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>⚽ استمتع بمتابعة أقوى المباريات ⚽</p>
        </div>
      </div>
    </div>
  );
};


export default MatchesPage;
