import { sql } from '@/lib/db';
import VideoCard from '@/components/VideoCard';

export const dynamic = 'force-dynamic';

export default async function WorksPage() {
  let videos: any[] = [];
  try {
    videos = await sql`SELECT * FROM videos ORDER BY created_at DESC`;
  } catch (error) {
    console.error('Failed to fetch videos:', error);
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans antialiased">
      <main className="relative z-10 pt-20 pb-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-16">
        
        <section className="relative">
            <div className="mb-10 text-center sm:text-left">
                <a href="/" className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors mb-8 inline-block">
                    &larr; Back to Home
                </a>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-neutral-900">
                    All <br/> <span className="font-serif italic font-normal text-neutral-500">Works</span>
                </h1>
                <p className="text-neutral-600 mt-4 max-w-sm text-sm leading-relaxed mx-auto sm:mx-0">
                    A comprehensive gallery of recent video projects.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {videos.length === 0 ? (
                  <div className="col-span-full py-20 text-center border border-dashed border-neutral-300 rounded-3xl bg-white/50">
                    <p className="text-neutral-500">More works being uploaded soon.</p>
                  </div>
                ) : videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </section>

      </main>

      <footer className="py-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4 px-4 sm:px-6 max-w-6xl mx-auto">
            <div className="text-center md:text-left">
                <p className="text-lg font-bold tracking-tighter uppercase text-neutral-900">VG.</p>
                <p className="text-neutral-500 text-xs mt-1">© {new Date().getFullYear()} Vinay Gogula. All Rights Reserved.</p>
            </div>
            
            <div className="flex gap-6 items-center">
                <a href="https://instagram.com/Thevinaygogula" target="_blank" className="text-neutral-500 hover:text-neutral-900 transition-colors uppercase text-[10px] tracking-[0.2em] font-medium">
                    Instagram
                </a>
                <a href="/" className="text-neutral-500 hover:text-neutral-900 transition-colors uppercase text-[10px] tracking-[0.2em] font-medium">
                    Home
                </a>
            </div>
        </footer>
    </div>
  );
}
