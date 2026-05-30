"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function VideoCard({ video }: { video: any }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    // Attempt to extract YouTube thumbnail
    if (video.platform === 'youtube' && video.url) {
      const match = video.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
      if (match && match[1]) {
        setThumbnailUrl(`https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`);
      }
    }
    // Attempt to extract Vimeo thumbnail via API
    else if (video.platform === 'vimeo' && video.url) {
      const match = video.url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (match && match[1]) {
        fetch(`https://vimeo.com/api/v2/video/${match[1]}.json`)
          .then(res => res.json())
          .then(data => {
            if (data && data[0] && data[0].thumbnail_large) {
              setThumbnailUrl(data[0].thumbnail_large);
            }
          })
          .catch(() => {
             // Fallback if Vimeo API fails
          });
      }
    }
  }, [video.platform, video.url]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="group relative aspect-[9/16] w-full bg-neutral-100 border border-neutral-200 overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-500"
    >
      <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-white/80 backdrop-blur-md text-neutral-900 text-[10px] font-bold uppercase tracking-widest border border-neutral-200 rounded-full shadow-sm">
          {video.video_type || video.platform}
      </div>

      {!isPlaying ? (
        <div 
          onClick={() => setIsPlaying(true)}
          className="w-full h-full cursor-pointer relative flex flex-col items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-200 group-hover:from-white transition-colors duration-500 overflow-hidden"
        >
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt="Video Thumbnail" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
          ) : (
            <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
          )}
          
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-0"></div>

          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-xl border border-white flex items-center justify-center z-10 shadow-xl"
          >
            <Play className="w-6 h-6 text-neutral-900 ml-1" />
          </motion.div>
        </div>
      ) : (
        video.platform === 'vimeo' ? (
          <iframe 
            src={`${video.url}&autoplay=1`}
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
            className="w-full h-full object-cover animate-in fade-in duration-1000" 
            title="Vimeo Video"
          ></iframe>
        ) : (
          <iframe 
            src={`${video.url}${video.url.includes('?') ? '&' : '?'}autoplay=1`}
            className="w-full h-full animate-in fade-in duration-1000" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        )
      )}
    </motion.div>
  );
}
