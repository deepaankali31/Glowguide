
// // Enhanced Reels JavaScript with Real YouTube API Reels
// document.addEventListener('DOMContentLoaded', function() {
//     // Initialize reels
//     initReels();
// });

// function initReels() {
//     const reelsContainer = document.getElementById('reels-container');
//     const ReelsInput = document.getElementById('Reels-input');
//     const ReelsBtn = document.getElementById('Reels-btn');
//     const prevBtn = document.getElementById('prev-reel');
//     const nextBtn = document.getElementById('next-reel');
//     const currentReelEl = document.getElementById('current-reel');
//     const totalReelsEl = document.getElementById('total-reels');
//     const suggestionTags = document.querySelectorAll('.suggestion-tag');

//     let currentReelIndex = 0;
//     let currentVideos = [];
    
//     // YouTube API Configuration
//     const YOUTUBE_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
//     const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

//     // Event listeners
//     if (ReelsBtn) {
//         ReelsBtn.addEventListener('click', performReels);
//     }

//     if (ReelsInput) {
//         ReelsInput.addEventListener('keypress', function(e) {
//             if (e.key === 'Enter') {
//                 performReels();
//             }
//         });
//     }

//     // Quick Reels suggestions
//     suggestionTags.forEach(tag => {
//         tag.addEventListener('click', function() {
//             const ReelsTerm = this.getAttribute('data-Reels');
//             ReelsInput.value = ReelsTerm;
//             performReels();
//         });
//     });

//     // Main function to fetch videos
//     async function performReels() {
//         const ReelsTerm = ReelsInput.value.trim();
        
//         if (!ReelsTerm) {
//             showFeedback('Please enter a Reels term');
//             return;
//         }

//         // Show loading state
//         reelsContainer.innerHTML = `
//             <div class="loading-state">
//                 <div class="loading-spinner">
//                     <i class="fas fa-spinner fa-spin"></i>
//                 </div>
//                 <p>Reelsing for "${ReelsTerm}"...</p>
//             </div>
//         `;

//         try {
//             const videos = await ReelsYouTubeVideos(ReelsTerm);
            
//             if (videos.length === 0) {
//                 reelsContainer.innerHTML = `
//                     <div class="reel-item-placeholder">
//                         <div class="placeholder-content">
//                             <i class="fas fa-video"></i>
//                             <h2>No videos found</h2>
//                             <p>Try Reelsing for different terms like "yoga", "meditation", or "exercise"</p>
//                         </div>
//                     </div>
//                 `;
//                 showFeedback('No videos found. Try different keywords.');
//                 return;
//             }

//             currentVideos = videos;
//             currentReelIndex = 0;
//             displayVideos();
//             showFeedback(`Found ${videos.length} videos`);

//         } catch (error) {
//             console.error('Reels error:', error);
//             reelsContainer.innerHTML = `
//                 <div class="reel-item-placeholder">
//                     <div class="placeholder-content">
//                         <i class="fas fa-exclamation-triangle"></i>
//                         <h2>Reels Failed</h2>
//                         <p>Unable to load videos. Please try again later.</p>
//                         <p style="font-size: 0.8rem; margin-top: 0.5rem;">Error: ${error.message}</p>
//                     </div>
//                 </div>
//             `;
//             showFeedback('Reels failed. Please try again.');
//         }
//     }

//     // Function to fetch YouTube videos
//     async function ReelsYouTubeVideos(query) {
//         const wellnessQuery = query + ' exercise fitness yoga meditation wellness health workout';
//         const params = new URLSearchParams({
//             part: 'snippet',
//             q: wellnessQuery,
//             type: 'video',
//             maxResults: 10,
//             videoEmbeddable: 'true',
//             videoSyndicated: 'true',
//             relevanceLanguage: 'en',
//             key: YOUTUBE_API_KEY
//         });

//         try {
//             const response = await fetch(`${YOUTUBE_API_URL}?${params}`);
            
//             if (!response.ok) {
//                 throw new Error(`YouTube API error: ${response.status}`);
//             }
            
//             const data = await response.json();
            
//             if (!data.items || data.items.length === 0) {
//                 throw new Error('No videos found');
//             }

//             // Filter to ensure we have valid video IDs
//             const validVideos = data.items.filter(item => 
//                 item.id && item.id.videoId && 
//                 item.snippet && item.snippet.title
//             );

//             if (validVideos.length === 0) {
//                 throw new Error('No valid videos found');
//             }

//             return validVideos;

//         } catch (error) {
//             console.error('YouTube API Error:', error);
//             console.log('Using fallback mock data...');
//             return getFallbackVideos(query);
//         }
//     }

//     // Fallback videos
//     function getFallbackVideos(query) {
//         const fallbackVideos = {
//             'yoga': [
//                 { id: { videoId: 'v7AYKMP6rOE' }, snippet: { title: 'Yoga For Beginners', description: '20 min yoga workout' } },
//                 { id: { videoId: '4C-gxOE0j7s' }, snippet: { title: 'Morning Yoga Flow', description: 'Energizing morning yoga' } }
//             ],
//             'meditation': [
//                 { id: { videoId: 'inpok4MKVLM' }, snippet: { title: '10 Min Meditation', description: 'Guided meditation' } },
//                 { id: { videoId: 'ss8CgWW4aeM' }, snippet: { title: '5 Min Stress Relief', description: 'Quick meditation' } }
//             ],
//             'exercise': [
//                 { id: { videoId: 'ml6cT4AZdqI' }, snippet: { title: '30 Min Full Body Workout', description: 'No equipment needed' } },
//                 { id: { videoId: 'JEEG0hBNk3E' }, snippet: { title: '15 Min HIIT', description: 'High intensity interval training' } }
//             ],
//             'default': [
//                 { id: { videoId: '4C-gxOE0j7s' }, snippet: { title: 'Morning Yoga', description: 'Start your day with yoga' } },
//                 { id: { videoId: 'inpok4MKVLM' }, snippet: { title: 'Guided Meditation', description: 'Relax and unwind' } },
//                 { id: { videoId: 'ml6cT4AZdqI' }, snippet: { title: 'Full Body Workout', description: 'No equipment workout' } }
//             ]
//         };

//         if (query.toLowerCase().includes('yoga')) return fallbackVideos.yoga;
//         if (query.toLowerCase().includes('meditation')) return fallbackVideos.meditation;
//         if (query.toLowerCase().includes('exercise') || query.toLowerCase().includes('workout')) return fallbackVideos.exercise;
//         return fallbackVideos.default;
//     }

//     // Display videos
//     function displayVideos() {
//         reelsContainer.innerHTML = '';
        
//         currentVideos.forEach((video, index) => {
//             const reelElement = document.createElement('div');
//             reelElement.className = `reel-item ${index === 0 ? 'active' : ''}`;
            
//             reelElement.innerHTML = `
//                 <iframe 
//                     src="https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${video.id.videoId}&modestbranding=1&rel=0" 
//                     title="${video.snippet.title}"
//                     frameborder="0" 
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//                     allowfullscreen>
//                 </iframe>
//                 <div class="video-overlay">
//                     <div class="video-title">${video.snippet.title}</div>
//                     <div class="video-description">${video.snippet.description}</div>
//                 </div>
//             `;
            
//             reelsContainer.appendChild(reelElement);
//         });

//         updateCounter();
//     }

//     // Navigation functions
//     function showReel(index) {
//         const reels = document.querySelectorAll('.reel-item');
//         reels.forEach(reel => reel.classList.remove('active'));
        
//         if (reels[index]) {
//             reels[index].classList.add('active');
//             currentReelIndex = index;
//             updateCounter();
//         }
//     }

//     function nextReel() {
//         if (currentVideos.length === 0) return;
//         const nextIndex = (currentReelIndex + 1) % currentVideos.length;
//         showReel(nextIndex);
//     }

//     function prevReel() {
//         if (currentVideos.length === 0) return;
//         const prevIndex = (currentReelIndex - 1 + currentVideos.length) % currentVideos.length;
//         showReel(prevIndex);
//     }

//     function updateCounter() {
//         currentReelEl.textContent = currentReelIndex + 1;
//         totalReelsEl.textContent = currentVideos.length;
//     }

//     // Event listeners for navigation
//     if (prevBtn) prevBtn.addEventListener('click', prevReel);
//     if (nextBtn) nextBtn.addEventListener('click', nextReel);

//     // Keyboard navigation
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); prevReel(); }
//         if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextReel(); }
//     });

//     // Touch/swipe support
//     let touchStartY = 0;
//     let touchEndY = 0;
//     reelsContainer.addEventListener('touchstart', e => touchStartY = e.changedTouches[0].screenY);
//     reelsContainer.addEventListener('touchend', e => { touchEndY = e.changedTouches[0].screenY; handleSwipe(); });
//     function handleSwipe() {
//         const swipeThreshold = 50;
//         const swipeDistance = touchStartY - touchEndY;
//         if (Math.abs(swipeDistance) < swipeThreshold) return;
//         swipeDistance > 0 ? nextReel() : prevReel();
//     }

//     initActionButtons();
// }

// // Action buttons
// function initActionButtons() {
//     const likeBtn = document.getElementById('like-btn');
//     const shareBtn = document.getElementById('share-btn');

//     if (likeBtn) {
//         likeBtn.addEventListener('click', function() {
//             this.classList.toggle('active');
//             this.innerHTML = this.classList.contains('active') ? 
//                 '<i class="fas fa-heart"></i>' : 
//                 '<i class="far fa-heart"></i>';
//             showFeedback(this.classList.contains('active') ? 'Liked!' : 'Like removed');
//         });
//     }

//     if (shareBtn) {
//         shareBtn.addEventListener('click', function() {
//             const currentIframe = document.querySelector('.reel-item.active iframe');
//             if (!currentIframe) return;
//             const videoUrl = currentIframe.src.split('?')[0];
//             if (navigator.share) {
//                 navigator.share({ title: 'Glow Guide Wellness Video', text: 'Check out this wellness video!', url: videoUrl });
//             } else {
//                 navigator.clipboard.writeText(videoUrl).then(() => showFeedback('Video link copied!'));
//             }
//         });
//     }
// }

// // Feedback messages
// function showFeedback(message) {
//     const feedback = document.createElement('div');
//     feedback.className = 'reel-feedback';
//     feedback.textContent = message;
//     feedback.style.cssText = `
//         position: fixed;
//         bottom: 100px;
//         left: 50%;
//         transform: translateX(-50%);
//         background: rgba(0, 0, 0, 0.8);
//         color: white;
//         padding: 0.75rem 1.5rem;
//         border-radius: 25px;
//         font-weight: 500;
//         z-index: 1000;
//         animation: fadeInOut 2s ease-in-out forwards;
//         backdrop-filter: blur(10px);
//         border: 1px solid rgba(255, 255, 255, 0.2);
//     `;
//     document.body.appendChild(feedback);
//     setTimeout(() => feedback.remove(), 2000);
// }

// // Add CSS for animations
// const style = document.createElement('style');
// style.textContent = `
// @keyframes fadeInOut {
//     0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
//     20% { opacity: 1; transform: translateX(-50%) translateY(0); }
//     80% { opacity: 1; transform: translateX(-50%) translateY(0); }
//     100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
// }
// .fa-spin { animation: spin 1s linear infinite; }
// @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
// `;
// document.head.appendChild(style);






// Reels JavaScript with YouTube API Integration
document.addEventListener('DOMContentLoaded', function() {
    initReels();
});

function initReels() {
    const reelsContainer = document.getElementById('reels-container');
    const reelsInput = document.getElementById('Reels-input'); // Match your HTML ID
    const reelsBtn = document.getElementById('Reels-btn'); // Match your HTML ID
    const prevBtn = document.getElementById('prev-reel');
    const nextBtn = document.getElementById('next-reel');
    const currentReelEl = document.getElementById('current-reel');
    const totalReelsEl = document.getElementById('total-reels');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    let currentReelIndex = 0;
    let currentVideos = [];
    
    // YouTube API Configuration
    const YOUTUBE_API_KEY = 'AIzaSyCTVmKmzlJtz0cCMSEh2EuDacoD56gmcPk'; 
    const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

    // Event listeners - match your HTML IDs
    if (reelsBtn) {
        reelsBtn.addEventListener('click', performReels);
    }

    if (reelsInput) {
        reelsInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performReels();
            }
        });
    }

    // Quick reels suggestions
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const reelsTerm = this.getAttribute('data-Reels'); // Match your HTML data attribute
            reelsInput.value = reelsTerm;
            performReels();
        });
    });

    // Main function to fetch videos
    async function performReels() {
        const reelsTerm = reelsInput.value.trim();
        
        if (!reelsTerm) {
            showFeedback('Please enter a search term');
            return;
        }

        // Show loading state
        reelsContainer.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <p>Searching for "${reelsTerm}"...</p>
            </div>
        `;

        try {
            // Try YouTube API first, fallback to mock data
            let videos;
            try {
                videos = await searchYouTubeVideos(reelsTerm);
            } catch (apiError) {
                console.log('YouTube API failed, using mock data:', apiError);
                videos = getMockVideos(reelsTerm);
            }
            
            if (videos.length === 0) {
                reelsContainer.innerHTML = `
                    <div class="reel-item-placeholder">
                        <div class="placeholder-content">
                            <i class="fas fa-video"></i>
                            <h2>No videos found</h2>
                            <p>Try searching for different terms like "yoga", "meditation", or "exercise"</p>
                        </div>
                    </div>
                `;
                showFeedback('No videos found. Try different keywords.');
                return;
            }

            currentVideos = videos;
            currentReelIndex = 0;
            displayVideos();
            showFeedback(`Found ${videos.length} videos`);

        } catch (error) {
            console.error('Search error:', error);
            reelsContainer.innerHTML = `
                <div class="reel-item-placeholder">
                    <div class="placeholder-content">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h2>Search Failed</h2>
                        <p>Unable to load videos. Please try again later.</p>
                    </div>
                </div>
            `;
            showFeedback('Search failed. Please try again.');
        }
    }

    // Real YouTube API function
    async function searchYouTubeVideos(query) {
        const wellnessQuery = query + ' exercise fitness yoga meditation wellness';
        const params = new URLSearchParams({
            part: 'snippet',
            q: wellnessQuery,
            type: 'video',
            maxResults: 10,
            videoEmbeddable: 'true',
            videoSyndicated: 'true',
            relevanceLanguage: 'en',
            key: YOUTUBE_API_KEY
        });

        console.log('Making YouTube API request...');
        const response = await fetch(`${YOUTUBE_API_URL}?${params}`);
        
        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('YouTube API response received');
        
        if (!data.items || data.items.length === 0) {
            throw new Error('No videos found');
        }

        // Filter valid videos
        const validVideos = data.items.filter(item => 
            item.id && item.id.videoId && 
            item.snippet && item.snippet.title
        );

        if (validVideos.length === 0) {
            throw new Error('No valid videos found');
        }

        return validVideos;
    }

    // Enhanced mock videos data (fallback)
    function getMockVideos(query) {
        const mockVideos = {
            'yoga': [
                { 
                    id: { videoId: 'v7AYKMP6rOE' }, 
                    snippet: { 
                        title: 'Yoga For Beginners - 20 Minute Home Yoga Workout!', 
                        description: '20 minute yoga workout for beginners to build strength and increase flexibility' 
                    }
                },
                { 
                    id: { videoId: '4C-gxOE0j7s' }, 
                    snippet: { 
                        title: 'Morning Yoga Full Body Flow', 
                        description: 'Energizing morning yoga routine for full body awakening and stress relief' 
                    }
                },
                { 
                    id: { videoId: 'dPj3bPJg5Fc' }, 
                    snippet: { 
                        title: 'Evening Yoga for Better Sleep', 
                        description: 'Gentle yoga sequence to help you relax and prepare for restful sleep' 
                    }
                }
            ],
            'meditation': [
                { 
                    id: { videoId: 'inpok4MKVLM' }, 
                    snippet: { 
                        title: '10 Minute Meditation for Beginners', 
                        description: 'Guided meditation session perfect for beginners to reduce stress and anxiety' 
                    }
                },
                { 
                    id: { videoId: 'ss8CgWW4aeM' }, 
                    snippet: { 
                        title: '5 Minute Meditation for Stress and Anxiety', 
                        description: 'Quick meditation practice to relieve stress and calm your mind' 
                    }
                },
                { 
                    id: { videoId: 'AZnHmXwFnkM' }, 
                    snippet: { 
                        title: 'Mindfulness Meditation for Focus', 
                        description: 'Improve your focus and concentration with this guided mindfulness session' 
                    }
                }
            ],
            'exercise': [
                { 
                    id: { videoId: 'ml6cT4AZdqI' }, 
                    snippet: { 
                        title: '30 Minute Full Body Workout at Home', 
                        description: 'Complete body workout without any equipment needed' 
                    }
                },
                { 
                    id: { videoId: 'JEEG0hBNk3E' }, 
                    snippet: { 
                        title: '15 Minute HIIT Workout for Fat Burn', 
                        description: 'High intensity interval training workout to boost metabolism' 
                    }
                },
                { 
                    id: { videoId: 'cS8EFa19o1c' }, 
                    snippet: { 
                        title: 'Full Body Cardio Workout', 
                        description: 'Get your heart pumping with this energetic cardio session' 
                    }
                }
            ],
            'workout': [
                { 
                    id: { videoId: 'GFa6Vg1rPDs' }, 
                    snippet: { 
                        title: '30 Day Fitness Challenge', 
                        description: 'Complete 30 day fitness transformation workout program' 
                    }
                },
                { 
                    id: { videoId: 'UBMk30rjy0o' }, 
                    snippet: { 
                        title: 'Full Body Stretching Routine', 
                        description: 'Complete stretching routine for flexibility and muscle recovery' 
                    }
                }
            ],
            'stretching': [
                { 
                    id: { videoId: 'gCH_0hppTDo' }, 
                    snippet: { 
                        title: 'Full Body Stretching for Flexibility', 
                        description: 'Improve your flexibility with this comprehensive stretching routine' 
                    }
                },
                { 
                    id: { videoId: 'E9A-_6n4Q_Q' }, 
                    snippet: { 
                        title: 'Morning Stretching Routine', 
                        description: 'Wake up your body with these energizing morning stretches' 
                    }
                }
            ],
            'default': [
                { 
                    id: { videoId: '4C-gxOE0j7s' }, 
                    snippet: { 
                        title: 'Morning Yoga for Beginners', 
                        description: 'Start your day with gentle yoga and mindfulness practice' 
                    }
                },
                { 
                    id: { videoId: 'inpok4MKVLM' }, 
                    snippet: { 
                        title: 'Guided Meditation Session', 
                        description: 'Relax and unwind with this peaceful meditation guidance' 
                    }
                },
                { 
                    id: { videoId: 'ml6cT4AZdqI' }, 
                    snippet: { 
                        title: 'Full Body Workout at Home', 
                        description: 'No equipment needed workout routine for all fitness levels' 
                    }
                },
                { 
                    id: { videoId: 'v7AYKMP6rOE' }, 
                    snippet: { 
                        title: 'Beginner Fitness Routine', 
                        description: 'Perfect workout for those just starting their fitness journey' 
                    }
                }
            ]
        };

        const queryLower = query.toLowerCase();
        
        if (queryLower.includes('yoga')) return mockVideos.yoga;
        if (queryLower.includes('meditation')) return mockVideos.meditation;
        if (queryLower.includes('exercise')) return mockVideos.exercise;
        if (queryLower.includes('workout')) return mockVideos.workout;
        if (queryLower.includes('stretch')) return mockVideos.stretching;
        
        return mockVideos.default;
    }

    // Display videos in the reels container
    function displayVideos() {
        reelsContainer.innerHTML = '';
        
        currentVideos.forEach((video, index) => {
            const reelElement = document.createElement('div');
            reelElement.className = `reel-item ${index === 0 ? 'active' : ''}`;
            reelElement.setAttribute('data-video-id', video.id.videoId);
            
            reelElement.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${video.id.videoId}&modestbranding=1&rel=0" 
                    title="${video.snippet.title}"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
                <div class="video-overlay">
                    <div class="video-title">${video.snippet.title}</div>
                    <div class="video-description">${video.snippet.description}</div>
                </div>
            `;
            
            reelsContainer.appendChild(reelElement);
        });

        updateCounter();
    }

    // Navigation functions
    function showReel(index) {
        const reels = document.querySelectorAll('.reel-item');
        reels.forEach(reel => reel.classList.remove('active'));
        
        if (reels[index]) {
            reels[index].classList.add('active');
            currentReelIndex = index;
            updateCounter();
        }
    }

    function nextReel() {
        if (currentVideos.length === 0) return;
        const nextIndex = (currentReelIndex + 1) % currentVideos.length;
        showReel(nextIndex);
    }

    function prevReel() {
        if (currentVideos.length === 0) return;
        const prevIndex = (currentReelIndex - 1 + currentVideos.length) % currentVideos.length;
        showReel(prevIndex);
    }

    function updateCounter() {
        currentReelEl.textContent = currentReelIndex + 1;
        totalReelsEl.textContent = currentVideos.length;
    }

    // Event listeners for navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', prevReel);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextReel);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            prevReel();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextReel();
        }
    });

    // Touch/swipe support for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    reelsContainer.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    reelsContainer.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartY - touchEndY;

        if (Math.abs(swipeDistance) < swipeThreshold) return;

        if (swipeDistance > 0) {
            nextReel();
        } else {
            prevReel();
        }
    }

    // Initialize action buttons
    initActionButtons();
}

// Action buttons functionality
function initActionButtons() {
    const likeBtn = document.getElementById('like-btn');
    const shareBtn = document.getElementById('share-btn');

    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            this.innerHTML = this.classList.contains('active') ? 
                '<i class="fas fa-heart"></i>' : 
                '<i class="far fa-heart"></i>';
            
            showFeedback(this.classList.contains('active') ? 'Liked!' : 'Like removed');
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const currentIframe = document.querySelector('.reel-item.active iframe');
            if (currentIframe) {
                const videoUrl = currentIframe.src.split('?')[0];
                if (navigator.share) {
                    navigator.share({
                        title: 'Glow Guide Wellness Video',
                        text: 'Check out this amazing wellness video!',
                        url: videoUrl
                    });
                } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(videoUrl).then(() => {
                        showFeedback('Video link copied to clipboard!');
                    });
                }
            }
        });
    }
}

// Show feedback messages
function showFeedback(message) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.reel-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    const feedback = document.createElement('div');
    feedback.className = 'reel-feedback';
    feedback.textContent = message;
    
    feedback.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        font-weight: 500;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out forwards;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { 
            opacity: 0; 
            transform: translateX(-50%) translateY(20px); 
        }
        20% { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0); 
        }
        80% { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0); 
        }
        100% { 
            opacity: 0; 
            transform: translateX(-50%) translateY(-20px); 
        }
    }
    
    .fa-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);