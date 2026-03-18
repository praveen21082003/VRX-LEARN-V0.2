import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Icon, Button } from '@/components/ui';
import { logo } from '@/assets';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.5, 2];

const VideoControls = ({ videoRef, setVideoDuration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);

  // --- Utilities ---
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // --- Core Handlers ---
  const updateVolume = useCallback((newVolume) => {
    const video = videoRef.current;
    if (!video) return;
    const clampedVolume = Math.min(1, Math.max(0, newVolume));
    video.volume = clampedVolume;
    setVolume(clampedVolume);
    setIsMuted(clampedVolume === 0);
    video.muted = clampedVolume === 0;
  }, [videoRef]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
  }, [videoRef]);

  const toggleMute = useCallback(() => {
    const targetVolume = isMuted ? (volume > 0 ? volume : 0.5) : 0;
    updateVolume(targetVolume);
  }, [isMuted, volume, updateVolume]);

  const toggleFullscreen = useCallback(() => {
    const container = videoRef.current?.parentElement;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  }, [videoRef]);

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // --- Keyboard Shortcuts ---
  useKeyboardShortcuts({
    'f': toggleFullscreen,
    ' ': togglePlay,
    'k': togglePlay,
    'm': toggleMute,
    'arrowright': () => { videoRef.current.currentTime += 5 },
    'arrowleft': () => { videoRef.current.currentTime -= 5 },
    'arrowup': () => updateVolume(volume + 0.1),
    'arrowdown': () => updateVolume(volume - 0.1),
  }, [volume, isMuted, togglePlay, toggleFullscreen, toggleMute]);

  // --- Dynamic Icons ---
  const speedIcon = useMemo(() => {
    if (speed < 1) return "mdi:speedometer-slow";
    if (speed > 1) return "mdi:speedometer";
    return "mdi:speedometer-medium";
  }, [speed]);

  // --- Video Event Listeners ---
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSync = () => {
      setIsPlaying(!video.paused);
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
      setVideoDuration(video.duration)
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    const handleFS = () => setIsFullscreen(!!document.fullscreenElement);

    // Auto-pause when tab is hidden (Production standard for UX/Performance)
    const handleVisibility = () => {
      if (document.hidden && !video.paused) video.pause();
    };

    video.addEventListener('play', handleSync);
    video.addEventListener('pause', handleSync);
    video.addEventListener('timeupdate', handleSync);
    video.addEventListener('loadedmetadata', handleSync);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('volumechange', handleSync);
    document.addEventListener('fullscreenchange', handleFS);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      video.removeEventListener('play', handleSync);
      video.removeEventListener('pause', handleSync);
      video.removeEventListener('timeupdate', handleSync);
      video.removeEventListener('loadedmetadata', handleSync);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('volumechange', handleSync);
      document.removeEventListener('fullscreenchange', handleFS);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [videoRef]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const close = () => setIsOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [isOpen]);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-4 flex flex-col gap-2 group/controls transition-opacity duration-300">

      {/* Progress Bar Container */}
      <div className="relative w-full h-1 bg-white/10 flex items-center group/progress">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="any"
          value={currentTime}
          onChange={handleSeek}
          className="absolute z-30 w-full h-full appearance-none bg-transparent cursor-pointer accent-red-600"
        />
        {/* Visual Track: Buffered */}
        <div
          className="absolute z-10 h-full bg-white/30 rounded-full transition-all"
          style={{ width: `${(buffered / duration) * 100}%` }}
        />
        {/* Visual Track: Played */}
        <div
          className="absolute z-20 h-full bg-red-600 rounded-full"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            frontIconName={isPlaying ? "iconoir:pause-solid" : "iconoir:play-solid"}
            onClick={togglePlay}
            className="p-3 hover:bg-white/20 rounded-full transition-colors"
            bgClass="bg-black/50"
            textClass="text-white"
          />

          {/* Volume Group */}
          <div className="hidden sm:flex items-center group/volume gap-2 bg-black/50 rounded-full p-2 pr-3 transition-all">
            <Button
              frontIconName={isMuted ? 'mingcute:volume-off-fill' : 'mingcute:volume-fill'}
              onClick={toggleMute}
              className="p-1"
              bgClass=""
              textClass="text-white"
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => updateVolume(parseFloat(e.target.value))}
              className="w-0 group-hover/volume:w-20 transition-all duration-300 appearance-none h-1 bg-white/30 rounded-full accent-white"
            />
          </div>

          {/* Time Display */}
          <div className="px-2 py-2 text-xs md:text-sm font-medium bg-black/50 hover:bg-black/60 rounded-full text-white tabular-nums flex items-center gap-1 select-none">
            <span>{formatTime(currentTime)}</span>
            <span className="opacity-60 "> / </span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center bg-black/50 hover:bg-black/60 px-3 py-1 rounded-full gap-1">
          {/* Logo - Hidden on mobile to save space */}
          <img src={logo} alt="Logo" className="hidden md:block h-7 p-0.5 bg-white rounded-sm ml-2 opacity-80 hover:opacity-100 transition-opacity" />

          {/* Speed Selector */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
              className="flex items-center gap-1 px-2 py-1 text-white hover:bg-white/10 rounded-full transition-colors text-sm font-medium"
            >
              <Icon name={speedIcon} height="18" width="18" />
              <span>{speed}x</span>
            </button>

            {isOpen && (
              <div className="absolute bottom-full mb-2 right-0 bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden min-w-[80px]">
                {SPEED_OPTIONS.map((s) => (
                  <button
                    key={s}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors ${speed === s ? 'text-red-500 bg-white' : 'text-white'}`}
                    onClick={() => {
                      videoRef.current.playbackRate = s;
                      setSpeed(s);
                    }}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            frontIconName={isFullscreen ? "mingcute:fullscreen-exit-fill" : "mingcute:fullscreen-fill"}
            onClick={toggleFullscreen}
            className="p-2 hover:bg-white/10 text-white rounded-full transition-colors"
            bgClass=""
            textClass=""
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(VideoControls);