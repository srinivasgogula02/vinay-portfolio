"use client";

import { useState, useEffect, FormEvent } from 'react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'videos' | 'testimonials' | 'clients'>('videos');
  const [password, setPassword] = useState('');
  
  // Videos
  const [videos, setVideos] = useState<any[]>([]);
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('youtube');
  const [videoType, setVideoType] = useState('Short');
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState('');

  // Testimonials
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testClientName, setTestClientName] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [testImageUrl, setTestImageUrl] = useState('');
  const [testLoading, setTestLoading] = useState(false);
  const [testError, setTestError] = useState('');

  // Clients
  const [clients, setClients] = useState<any[]>([]);
  const [brandName, setBrandName] = useState('');
  const [brandImageUrl, setBrandImageUrl] = useState('');
  const [brandLink, setBrandLink] = useState('');
  const [brandLoading, setBrandLoading] = useState(false);
  const [brandError, setBrandError] = useState('');

  useEffect(() => {
    fetchVideos();
    fetchTestimonials();
    fetchClients();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/videos');
      const data = await res.json();
      if (Array.isArray(data)) setVideos(data);
    } catch (err) {
      console.error('Failed to fetch videos', err);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (Array.isArray(data)) setTestimonials(data);
    } catch (err) {
      console.error('Failed to fetch testimonials', err);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      if (Array.isArray(data)) setClients(data);
    } catch (err) {
      console.error('Failed to fetch clients', err);
    }
  };

  const handleAddVideo = async (e: FormEvent) => {
    e.preventDefault();
    setVideoLoading(true);
    setVideoError('');

    try {
      let finalUrl = url;
      if (platform === 'youtube' && !url.includes('embed')) {
        const videoId = url.split('v=')[1]?.split('&')[0] || url.split('youtu.be/')[1];
        if (videoId) finalUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (platform === 'vimeo' && !url.includes('player.vimeo.com')) {
        const videoId = url.split('vimeo.com/')[1];
        if (videoId) finalUrl = `https://player.vimeo.com/video/${videoId}`;
      }

      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl, platform, video_type: videoType, password }),
      });

      if (!res.ok) throw new Error((await res.json()).error || 'Failed to add video');

      setUrl('');
      await fetchVideos();
    } catch (err: any) {
      setVideoError(err.message);
    } finally {
      setVideoLoading(false);
    }
  };

  const handleAddTestimonial = async (e: FormEvent) => {
    e.preventDefault();
    setTestLoading(true);
    setTestError('');

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_name: testClientName, company, content, rating, image_url: testImageUrl, password }),
      });

      if (!res.ok) throw new Error((await res.json()).error || 'Failed to add testimonial');

      setTestClientName('');
      setCompany('');
      setContent('');
      setRating(5);
      setTestImageUrl('');
      await fetchTestimonials();
    } catch (err: any) {
      setTestError(err.message);
    } finally {
      setTestLoading(false);
    }
  };

  const handleAddClient = async (e: FormEvent) => {
    e.preventDefault();
    setBrandLoading(true);
    setBrandError('');

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: brandName, image_url: brandImageUrl, link: brandLink, password }),
      });

      if (!res.ok) throw new Error((await res.json()).error || 'Failed to add client');

      setBrandName('');
      setBrandImageUrl('');
      setBrandLink('');
      await fetchClients();
    } catch (err: any) {
      setBrandError(err.message);
    } finally {
      setBrandLoading(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Delete this video?')) return;
    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      await fetchVideos();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      await fetchTestimonials();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('Delete this client/brand?')) return;
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      await fetchClients();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-neutral-900 p-8 antialiased font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tighter uppercase text-neutral-900">Admin Dashboard</h1>
          <div className="flex gap-2 border border-neutral-200 p-1 rounded-full bg-white/50 backdrop-blur-md shadow-sm overflow-x-auto">
            <button 
              onClick={() => setActiveTab('videos')}
              className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${activeTab === 'videos' ? 'bg-neutral-900 text-white shadow-md' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Videos
            </button>
            <button 
              onClick={() => setActiveTab('testimonials')}
              className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${activeTab === 'testimonials' ? 'bg-neutral-900 text-white shadow-md' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Testimonials
            </button>
            <button 
              onClick={() => setActiveTab('clients')}
              className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${activeTab === 'clients' ? 'bg-neutral-900 text-white shadow-md' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Brands / Clients
            </button>
          </div>
        </div>

        {/* Global Password Input */}
        <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm">
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Admin Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all placeholder-neutral-400" 
          />
        </div>

        {activeTab === 'videos' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-neutral-900">Add New Video</h2>
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Platform</label>
                    <select 
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 appearance-none"
                    >
                      <option value="youtube">YouTube</option>
                      <option value="vimeo">Vimeo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Video Type Label</label>
                    <input 
                      type="text" 
                      value={videoType}
                      onChange={(e) => setVideoType(e.target.value)}
                      placeholder="e.g. Short, Highlight"
                      className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 placeholder-neutral-400" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Video URL</label>
                  <input 
                    type="url" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste YouTube or Vimeo URL"
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 placeholder-neutral-400" 
                  />
                </div>

                {videoError && <p className="text-red-500 text-sm">{videoError}</p>}

                <button 
                  type="submit" 
                  disabled={videoLoading}
                  className="bg-neutral-900 text-white font-bold uppercase tracking-widest px-8 py-3 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 shadow-md"
                >
                  {videoLoading ? 'Adding...' : 'Add Video'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-6 text-neutral-900">Manage Videos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map(video => (
                  <div key={video.id} className="bg-white border border-neutral-200 p-4 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center text-xs text-neutral-400 overflow-hidden break-all px-2">
                      {video.url}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-sm uppercase text-neutral-900">{video.platform}</p>
                        <p className="text-xs text-neutral-500">{video.video_type}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteVideo(video.id)}
                        className="text-red-500/80 text-sm hover:text-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-neutral-900">Add New Testimonial</h2>
              <form onSubmit={handleAddTestimonial} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Client Name</label>
                    <input 
                      type="text" 
                      value={testClientName}
                      onChange={(e) => setTestClientName(e.target.value)}
                      required
                      className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 placeholder-neutral-400" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Company / Role</label>
                    <input 
                      type="text" 
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 placeholder-neutral-400" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Rating (1-5)</label>
                    <input 
                      type="number" 
                      min="1" max="5"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      required
                      className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 placeholder-neutral-400" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Image URL (Optional)</label>
                    <input 
                      type="url" 
                      value={testImageUrl}
                      onChange={(e) => setTestImageUrl(e.target.value)}
                      placeholder="https://.../avatar.jpg"
                      className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 placeholder-neutral-400" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Review Content</label>
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={4}
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 placeholder-neutral-400" 
                  ></textarea>
                </div>

                {testError && <p className="text-red-500 text-sm">{testError}</p>}

                <button 
                  type="submit" 
                  disabled={testLoading}
                  className="bg-neutral-900 text-white font-bold uppercase tracking-widest px-8 py-3 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 shadow-md"
                >
                  {testLoading ? 'Adding...' : 'Add Testimonial'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-6 text-neutral-900">Manage Testimonials</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {testimonials.map(test => (
                  <div key={test.id} className="bg-white border border-neutral-200 p-6 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-neutral-800 italic font-serif">"{test.content}"</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="font-bold text-neutral-900">{test.client_name}</p>
                        <p className="text-xs text-neutral-500">{test.company}</p>
                        <p className="text-orange-400 text-xs mt-1">{'★'.repeat(test.rating)}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteTestimonial(test.id)}
                        className="text-red-500/80 text-sm hover:text-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-neutral-900">Add Brand / Client Logo</h2>
              <form onSubmit={handleAddClient} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Brand Name</label>
                    <input 
                      type="text" 
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      required
                      placeholder="e.g. Nike"
                      className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 placeholder-neutral-400" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Link (Optional)</label>
                    <input 
                      type="url" 
                      value={brandLink}
                      onChange={(e) => setBrandLink(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 placeholder-neutral-400" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Image / Logo URL</label>
                  <input 
                    type="url" 
                    value={brandImageUrl}
                    onChange={(e) => setBrandImageUrl(e.target.value)}
                    required
                    placeholder="https://.../logo.png (Transparent PNG/SVG works best)"
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 placeholder-neutral-400" 
                  />
                </div>

                {brandError && <p className="text-red-500 text-sm">{brandError}</p>}

                <button 
                  type="submit" 
                  disabled={brandLoading}
                  className="bg-neutral-900 text-white font-bold uppercase tracking-widest px-8 py-3 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 shadow-md"
                >
                  {brandLoading ? 'Adding...' : 'Add Brand'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-6 text-neutral-900">Manage Brands</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map(client => (
                  <div key={client.id} className="bg-white border border-neutral-200 p-4 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-[3/1] bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center p-4">
                      <img src={client.image_url} alt={client.name} className="h-full object-contain max-w-full mix-blend-multiply" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-sm uppercase text-neutral-900">{client.name}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteClient(client.id)}
                        className="text-red-500/80 text-sm hover:text-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
