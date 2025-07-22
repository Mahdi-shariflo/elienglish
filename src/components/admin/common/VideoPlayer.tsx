// import Button from '@/components/common/Button';
// import React, { useCallback, useState, useRef, useEffect } from 'react';
// import ReactPlayer from 'react-player';

// const formatTime = (seconds: number) => {
//   const minutes = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
// };

// const VideoPlayer = ({ url, poster }: { url: string; poster: string }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const playerRef = useRef<ReactPlayer | null>(null);
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const [played, setPlayed] = useState(0);
//   const videoRef = useRef(null);
//   const [duration, setDuration] = useState(0);
//   const handlePlayPause = useCallback(() => {
//     setPlaying((prev) => !prev);
//   }, []);

//   const seekForward = () => {
//     if (playerRef.current) {
//       playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
//     }
//   };

//   const seekBackward = () => {
//     if (playerRef.current) {
//       playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
//     }
//   };

//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const toggleFullscreen = () => {
//     if (!isFullscreen) {
//       // @ts-expect-error error
//       videoRef?.current?.requestFullscreen();
//     } else {
//       document.exitFullscreen();
//     }
//     setIsFullscreen((prev) => !prev);
//   };

//   useEffect(() => {
//     // @ts-expect-error error
//     const handleKeyDown = (event) => {
//       switch (event.key) {
//         case ' ':
//           handlePlayPause();
//           event.preventDefault();
//           break;
//         case 'ArrowRight':
//           seekForward();
//           break;
//         case 'ArrowLeft':
//           seekBackward();
//           break;
//         case 'f':
//           toggleFullscreen();
//           break;
//         default:
//           break;
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [handlePlayPause, seekForward, seekBackward, toggleFullscreen]);

//   return (
//     <div ref={videoRef} className="video-player relative h-full w-full overflow-hidden rounded-lg">
//       {isPlaying ? (
//         <div className="aspect-video">
//           <ReactPlayer
//             ref={playerRef}
//             url={url}
//             playing={isPlaying}
//             volume={volume}
//             onProgress={({ played }) => setPlayed(played)}
//             controls={false}
//             width="100%"
//             height="100%"
//             onDuration={(d) => setDuration(d)}

//             // light={poster}
//           />

//           <div
//             dir="ltr"
//             className="absolute bottom-0 left-1/2 z-[9999] w-[85%] -translate-x-1/2 space-y-3"
//           >
//             {/* کنترل زمان */}
//             <div className="mt-4">
//               <input
//                 id="progress"
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={played}
//                 onChange={(e) => {
//                   const newValue = parseFloat(e.target.value);
//                   setPlayed(newValue);
//                   if (playerRef.current) {
//                     playerRef.current.seekTo(newValue);
//                   }
//                 }}
//                 className="custom-range"
//               />
//             </div>
//             <div className="flex w-full items-center justify-between">
//               {/* کنترل دکمه‌ها */}
//               <div className="flex items-center justify-start gap-4">
//                 <button onClick={seekBackward}>
//                   <svg
//                     width="30"
//                     height="30"
//                     viewBox="0 0 40 40"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M17.832 31.6654L2.83203 19.9987L17.832 8.33203V31.6654Z"
//                       stroke="white"
//                       stroke-width="4"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                     <path
//                       d="M36.1641 31.6654L21.1641 19.9987L36.1641 8.33203V31.6654Z"
//                       stroke="white"
//                       stroke-width="4"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                   </svg>
//                 </button>
//                 <button onClick={handlePlayPause}>
//                   {playing ? (
//                     <svg
//                       className="text-white"
//                       stroke="currentColor"
//                       fill="currentColor"
//                       stroke-width="0"
//                       viewBox="0 0 24 24"
//                       height="30px"
//                       width="30px"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <g id="Pause_1">
//                         <g>
//                           <path d="M8.25,21.937H6.564a2.5,2.5,0,0,1-2.5-2.5V4.563a2.5,2.5,0,0,1,2.5-2.5H8.25a2.5,2.5,0,0,1,2.5,2.5V19.437A2.5,2.5,0,0,1,8.25,21.937ZM6.564,3.063a1.5,1.5,0,0,0-1.5,1.5V19.437a1.5,1.5,0,0,0,1.5,1.5H8.25a1.5,1.5,0,0,0,1.5-1.5V4.563a1.5,1.5,0,0,0-1.5-1.5Z"></path>
//                           <path d="M17.436,21.937H15.75a2.5,2.5,0,0,1-2.5-2.5V4.563a2.5,2.5,0,0,1,2.5-2.5h1.686a2.5,2.5,0,0,1,2.5,2.5V19.437A2.5,2.5,0,0,1,17.436,21.937ZM15.75,3.063a1.5,1.5,0,0,0-1.5,1.5V19.437a1.5,1.5,0,0,0,1.5,1.5h1.686a1.5,1.5,0,0,0,1.5-1.5V4.563a1.5,1.5,0,0,0-1.5-1.5Z"></path>
//                         </g>
//                       </g>
//                     </svg>
//                   ) : (
//                     <svg
//                       width="30"
//                       height="30"
//                       viewBox="0 0 40 40"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M7.97656 5L31.3099 20L7.97656 35V5Z"
//                         stroke="white"
//                         stroke-width="2.85714"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       />
//                     </svg>
//                   )}
//                 </button>
//                 <button onClick={seekForward}>
//                   <svg
//                     width="30"
//                     height="30"
//                     viewBox="0 0 40 40"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M21.1641 31.6654L36.1641 19.9987L21.1641 8.33203V31.6654Z"
//                       stroke="white"
//                       stroke-width="4"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                     <path
//                       d="M2.83203 31.6654L17.832 19.9987L2.83203 8.33203V31.6654Z"
//                       stroke="white"
//                       stroke-width="4"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <div className="flex items-center gap-4">
//                 {/* کنترل صدا */}
//                 <div className="flex items-center gap-3">
//                   <span>
//                     <svg
//                       width="30"
//                       height="30"
//                       viewBox="0 0 32 32"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M14.168 6.66797L7.5013 12.0013H2.16797V20.0013H7.5013L14.168 25.3346V6.66797Z"
//                         stroke="white"
//                         stroke-width="3"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       />
//                       <path
//                         d="M24.9293 6.57422C27.4289 9.07459 28.8331 12.4654 28.8331 16.0009C28.8331 19.5364 27.4289 22.9272 24.9293 25.4276M20.2227 11.2809C21.4725 12.5311 22.1746 14.2265 22.1746 15.9942C22.1746 17.762 21.4725 19.4574 20.2227 20.7076"
//                         stroke="white"
//                         stroke-width="3"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       />
//                     </svg>
//                   </span>
//                   <input
//                     type="range"
//                     min={0}
//                     max={1}
//                     step="0.01"
//                     value={volume}
//                     onChange={(e) => setVolume(parseFloat(e.target.value))}
//                     className="custom-volume"
//                   />
//                 </div>
//                 <div className="text-md w-[100px] text-right font-medium text-white">
//                   {formatTime(played * duration)} / {formatTime(duration)}
//                 </div>
//                 <div>
//                   {/* Video player content */}
//                   <Button className="!w-fit !min-w-fit" onClick={toggleFullscreen}>
//                     {isFullscreen ? (
//                       <svg
//                         width="32"
//                         height="33"
//                         viewBox="0 0 32 33"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M10.1667 4.9375H6.16667C5.45942 4.9375 4.78115 5.21845 4.28105 5.71855C3.78095 6.21865 3.5 6.89692 3.5 7.60417V11.6042M27.5 11.6042V7.60417C27.5 6.89692 27.219 6.21865 26.719 5.71855C26.2189 5.21845 25.5406 4.9375 24.8333 4.9375H20.8333M20.8333 28.9375H24.8333C25.5406 28.9375 26.2189 28.6565 26.719 28.1565C27.219 27.6564 27.5 26.9781 27.5 26.2708V22.2708M3.5 22.2708V26.2708C3.5 26.9781 3.78095 27.6564 4.28105 28.1565C4.78115 28.6565 5.45942 28.9375 6.16667 28.9375H10.1667"
//                           stroke="white"
//                           stroke-width="3"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         width="32"
//                         height="33"
//                         viewBox="0 0 32 33"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M10.1667 4.9375H6.16667C5.45942 4.9375 4.78115 5.21845 4.28105 5.71855C3.78095 6.21865 3.5 6.89692 3.5 7.60417V11.6042M27.5 11.6042V7.60417C27.5 6.89692 27.219 6.21865 26.719 5.71855C26.2189 5.21845 25.5406 4.9375 24.8333 4.9375H20.8333M20.8333 28.9375H24.8333C25.5406 28.9375 26.2189 28.6565 26.719 28.1565C27.219 27.6564 27.5 26.9781 27.5 26.2708V22.2708M3.5 22.2708V26.2708C3.5 26.9781 3.78095 27.6564 4.28105 28.1565C4.78115 28.6565 5.45942 28.9375 6.16667 28.9375H10.1667"
//                           stroke="white"
//                           stroke-width="3"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         />
//                       </svg>
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div
//           className="absolute z-50 h-full w-full cursor-pointer"
//           onClick={() => setIsPlaying(true)}
//         >
//           {/* پوستر خودت */}
//           <img src={poster} alt="video poster" className="h-full w-full object-fill" />
//           {/* دکمه پلی سفارشی */}
//           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//             <svg
//               width="42"
//               height="43"
//               viewBox="0 0 42 43"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect y="0.5" width="42" height="42" rx="21" fill="#101010" fill-opacity="0.4" />
//               <path
//                 d="M27.5402 18.9983L17.8802 13.4583C17.3575 13.1565 16.7642 12.9984 16.1606 13C15.557 13.0017 14.9646 13.163 14.4435 13.4678C13.9225 13.7725 13.4914 14.2096 13.194 14.7349C12.8966 15.2601 12.7435 15.8547 12.7502 16.4583V27.5783C12.7502 28.4854 13.1105 29.3552 13.7519 29.9966C14.3933 30.638 15.2632 30.9983 16.1702 30.9983C16.7707 30.9973 17.3603 30.8387 17.8802 30.5383L27.5402 24.9983C28.0593 24.6979 28.4902 24.2663 28.7898 23.7468C29.0894 23.2272 29.2471 22.638 29.2471 22.0383C29.2471 21.4386 29.0894 20.8494 28.7898 20.3299C28.4902 19.8103 28.0593 19.3787 27.5402 19.0783V18.9983ZM26.5402 23.1883L16.8802 28.8083C16.6637 28.931 16.4191 28.9955 16.1702 28.9955C15.9213 28.9955 15.6767 28.931 15.4602 28.8083C15.2443 28.6837 15.065 28.5044 14.9404 28.2885C14.8158 28.0725 14.7502 27.8276 14.7502 27.5783V16.4183C14.7502 16.169 14.8158 15.9241 14.9404 15.7082C15.065 15.4923 15.2443 15.313 15.4602 15.1883C15.6776 15.0675 15.9215 15.0022 16.1702 14.9983C16.4187 15.0034 16.6624 15.0686 16.8802 15.1883L26.5402 20.7683C26.7562 20.8929 26.9356 21.0722 27.0603 21.2881C27.185 21.504 27.2506 21.749 27.2506 21.9983C27.2506 22.2477 27.185 22.4926 27.0603 22.7085C26.9356 22.9244 26.7562 23.1037 26.5402 23.2283V23.1883Z"
//                 fill="white"
//               />
//             </svg>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .custom-range {
//           width: 100%;
//           height: 6px;
//           appearance: none;
//           background: linear-gradient(
//             to right,
//             #ffffff ${played * 100}%,
//             #ffffff80 ${played * 100}%
//           );
//           border-radius: 4px;
//           outline: none;
//         }

//         .custom-range::-webkit-slider-thumb {
//           appearance: none;
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//           background: #ffffff;
//           cursor: pointer;
//         }

//         .custom-range::-moz-range-thumb {
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//           background: #ffffff;
//           cursor: pointer;
//         }

//         .custom-range::-ms-thumb {
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//           background: #ffffff;
//           cursor: pointer;
//         }

//         .custom-volume {
//           width: 100%;
//           height: 6px;
//           appearance: none;
//           background: linear-gradient(
//             to right,
//             #ffffff ${volume * 100}%,
//             #ffffff80 ${volume * 100}%
//           );
//           border-radius: 4px;
//           outline: none;
//           transition: background 0.3s ease;
//         }

//         .custom-volume::-webkit-slider-thumb {
//           appearance: none;
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//           background: #ffffff;
//           cursor: pointer;
//           border: none;
//           margin-top: 0px;
//         }

//         .custom-volume::-moz-range-thumb {
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//           background: #ffffff;
//           cursor: pointer;
//           border: none;
//         }

//         .custom-volume::-ms-thumb {
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//           background: #ffffff;
//           cursor: pointer;
//           border: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VideoPlayer;

import React from 'react';
import HlsPlayer from './HlsPlayer';
type Props = {
  url: string;
  poster: string;
};
const VideoPlayer = ({ url }: Props) => {
  return <HlsPlayer src={url} />;
};

export default VideoPlayer;
