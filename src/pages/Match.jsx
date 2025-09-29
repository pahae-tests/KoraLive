import React, { useEffect, useState } from 'react';
import { Heart, Users, Sparkles, Play, Clock, Trophy, Monitor, Wifi } from 'lucide-react';
import { useRouter } from 'next/router';

const MatchVideoPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [match, setMatch] = useState({});
    const [frame, setFrame] = useState("");
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/match?id=${id}`);
                const data = await res.json();

                if (data.match) setMatch(data.match);
                if (data.frame) setFrame(data.frame);
                console.log(data);
            } catch (error) {
                console.error("Erreur lors du fetch:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatch();
    }, [id]);

    const LiveIndicator = () => (
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-green-400 font-bold text-sm">LIVE</span>
        </div>
    );

    return (
        <div className="min-h-screen p-4" dir="rtl">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 pt-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Trophy className="w-8 h-8 text-pink-500" />
                        <h1 className="text-3xl font-bold text-white">مشاهدة المباراة</h1>
                        <Trophy className="w-8 h-8 text-pink-500" />
                    </div>
                    <p className="text-gray-400 text-lg">
                        استمتع بمشاهدة المباراة بأفضل جودة ✨
                    </p>
                </div>

                {/* Main Container */}
                <div className="bg-gray-950/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl">
                    {/* Teams Header */}
                    <div className="p-6 flex items-center justify-between border-b border-gray-800/50">
                        {/* Team 1 */}
                        <div className="flex flex-col items-center text-center flex-1">
                            <img
                                src={match.team1?.logo}
                                alt={match.team1?.name}
                                className="w-16 h-16 object-contain mb-2"
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGRjAwN0YiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+CjwvZz4KPC9zdmc+';
                                }}
                            />
                            <h3 className="text-white font-bold text-sm">{match.team1?.name}</h3>
                        </div>

                        {/* Match Info */}
                        <div className="flex flex-col items-center text-center px-6">
                            {/* Live Indicator */}
                            <div className="mb-2">
                                <LiveIndicator />
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
                            <img
                                src={match.team2?.logo}
                                alt={match.team2?.name}
                                className="w-16 h-16 object-contain mb-2"
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiMwMDdGRkYiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+CjwvZz4KPC9zdmc+';
                                }}
                            />
                            <h3 className="text-white font-bold text-sm">{match.team2?.name}</h3>
                        </div>
                    </div>

                    {/* Video Player */}
                    <div className="relative">
                        <div className="aspect-video bg-black flex items-center justify-center relative overflow-hidden">
                            {isLoading ? (
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 mb-4 bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
                                        <Sparkles className="w-8 h-8 text-white animate-spin" />
                                    </div>
                                    <p className="text-white font-medium">جاري التحميل...</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="w-full h-full"
                                    dangerouslySetInnerHTML={{ __html: frame }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-500 text-sm mt-8">
                    <p>⚽ استمتع بمتابعة أقوى المباريات ⚽</p>
                </div>
            </div>
        </div>
    );
};

export default MatchVideoPage;