import { sql } from '@/lib/db';
import Image from 'next/image';
import VideoCard from '@/components/VideoCard';
import TestimonialGrid from '@/components/TestimonialGrid';
import { LogoCloud } from '@/components/ui/logo-cloud-2';
import ClientsMarquee from '@/components/ClientsMarquee';
import { Edit3, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let videos: any[] = [];
  let testimonials: any[] = [];
  let clients: any[] = [];
  
  try {
    videos = await sql`SELECT * FROM videos ORDER BY created_at DESC`;
    testimonials = await sql`SELECT * FROM testimonials ORDER BY created_at DESC`;
    clients = await sql`SELECT * FROM clients ORDER BY created_at DESC`;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-neutral-900 selection:bg-neutral-900 selection:text-[#F8F7F4] overflow-x-hidden font-sans">
      
      {/* Cinematic Ambient Glow (Warm Light Theme) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-200/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-stone-300/30 blur-[120px]"></div>
      </div>
      
      {/* Film Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.75%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] mix-blend-overlay"></div>

      <main className="relative z-10 pt-16 pb-16 px-4 sm:px-6 max-w-6xl mx-auto space-y-24 md:space-y-32">
        
        <section className="min-h-[75vh] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
              
              <div className="lg:w-1/2 space-y-8 w-full">
                  <div className="space-y-1">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neutral-500 pl-1 font-semibold">Video Editor & Creator</p>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-neutral-900">
                        VINAY <br />
                        <span className="font-serif italic font-normal text-neutral-500">Gogula</span>
                    </h1>
                  </div>
                  
                  <div className="h-px w-16 bg-neutral-300"></div>

                  <div className="space-y-4 text-base md:text-lg font-light text-neutral-600 max-w-md leading-relaxed">
                      <p>
                          18-year-old creative crafting edits that don&apos;t just exist — <span className="text-neutral-900 font-medium">they perform.</span>
                      </p>
                      <p>
                          Specializing in high-retention visual storytelling that cuts through the noise and commands attention.
                      </p>
                  </div>

                  <div className="flex flex-row items-center gap-2 sm:gap-4 pt-4 w-full sm:w-auto">
                    <a 
                      href="#contact" 
                      className="flex-1 sm:flex-none justify-center bg-neutral-900 text-white py-4 px-2 sm:px-8 rounded-none text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Contact
                    </a>
                    <a 
                      href="/works" 
                      className="flex-1 sm:flex-none justify-center group bg-white/50 backdrop-blur-md border border-neutral-200/80 text-neutral-900 py-4 px-2 sm:px-8 rounded-none text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl flex items-center gap-2 relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Works
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      {/* Soft shine effect on hover */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent group-hover:animate-[shimmer_1.5s_infinite] opacity-50"></div>
                    </a>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex flex-col">
                        <span className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900">10M+</span>
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1 font-medium">Organic Views</span>
                    </div>
                  </div>
              </div>

              <div className="lg:w-1/2 w-full relative mt-8 lg:mt-0">
                  <div className="aspect-[4/5] w-full max-w-[320px] mx-auto lg:ml-auto bg-neutral-200 border border-neutral-200 rounded-3xl overflow-hidden relative shadow-xl">
                      <Image 
                          src="/image.png" 
                          alt="Vinay Gogula" 
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                  </div>
              </div>
          </div>
        </section>

        {/* CLIENTS MARQUEE */}
        <ClientsMarquee clients={clients} />

        {/* EXPERTISE & TOOLS - LOGO CLOUD */}
        <section className="relative">
            <div className="mb-10 text-center sm:text-left">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-neutral-900">The Craft</h2>
                <p className="text-neutral-600 mt-2 max-w-md text-sm leading-relaxed mx-auto sm:mx-0">Software is just the medium. The vision is the craft. Leveraging industry standard tools to build cinematic experiences.</p>
            </div>

            <LogoCloud />
        </section>

        {/* SELECTED WORKS */}
        <section id="work" className="relative">
            <div className="mb-10 flex flex-col md:flex-row justify-between items-end pb-6 border-b border-neutral-200 text-center sm:text-left">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-neutral-900">Selected <br/> <span className="font-serif italic font-normal text-neutral-500">Works</span></h2>
                <p className="text-neutral-600 max-w-xs text-sm mt-4 md:mt-0 md:text-right mx-auto sm:mx-0">A curated gallery of recent edits, optimized for retention and impact.</p>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 md:snap-none no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                {videos.length === 0 ? (
                  <div className="w-full md:col-span-full py-20 text-center border border-dashed border-neutral-300 rounded-3xl bg-white/50">
                    <p className="text-neutral-500">More works being uploaded soon.</p>
                  </div>
                ) : videos.slice(0, 5).map((video) => (
                  <div key={video.id} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center">
                    <VideoCard video={video} />
                  </div>
                ))}
            </div>

            {videos.length > 5 && (
                <div className="mt-8 text-center w-full flex justify-center">
                    <a 
                      href="/works" 
                      className="inline-flex items-center justify-center bg-white border border-neutral-200 text-neutral-900 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors shadow-sm hover:shadow-md"
                    >
                        View All Works
                    </a>
                </div>
            )}
        </section>

        {/* TESTIMONIALS */}
        {testimonials.length > 0 && (
          <section className="relative">
              <div className="mb-10 text-center">
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-neutral-900">Client <span className="font-serif italic font-normal text-neutral-500">Words</span></h2>
              </div>
              <TestimonialGrid testimonials={testimonials} />
          </section>
        )}

        {/* CONTACT */}
        <section id="contact" className="relative">
            <div className="rounded-3xl bg-white border border-neutral-200 p-6 sm:p-10 md:p-12 shadow-lg relative overflow-hidden">
                {/* Background soft element */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-50/50 to-transparent pointer-events-none"></div>

                <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16 relative z-10">
                    <div className="lg:w-1/3 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-neutral-900">Ready to <br/><span className="font-serif italic font-normal text-neutral-500">Create?</span></h2>
                        <p className="text-neutral-600 text-sm md:text-base max-w-md">Let&apos;s elevate your content and build a visual identity that scales. Book a meeting directly below.</p>
                    </div>
                    
                    <div className="w-full lg:w-2/3 flex flex-col items-center">
                        <div className="w-full h-[650px] rounded-2xl overflow-hidden shadow-lg border border-neutral-200 bg-white">
                            <iframe 
                                src="https://calendly.com/vinaygogula/30min?hide_event_type_details=1&hide_gdpr_banner=1" 
                                width="100%" 
                                height="100%" 
                                frameBorder="0"
                            ></iframe>
                        </div>
                        
                        <div className="pt-8 w-full flex flex-col items-center">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3 text-center font-bold">Or reach out directly</p>
                            <a href="mailto:gogulavinay80@gmail.com" className="flex items-center gap-3 group w-fit">
                              <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-colors bg-neutral-50">
                                <Edit3 className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-neutral-900">gogulavinay80@gmail.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer className="py-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
                <p className="text-lg font-bold tracking-tighter uppercase text-neutral-900">VG.</p>
                <p className="text-neutral-500 text-xs mt-1">© {new Date().getFullYear()} Vinay Gogula. All Rights Reserved.</p>
            </div>
            
            <div className="flex gap-6 items-center">
                <a href="https://instagram.com/Thevinaygogula" target="_blank" className="text-neutral-500 hover:text-neutral-900 transition-colors uppercase text-[10px] tracking-[0.2em] font-medium">
                    Instagram
                </a>
                <a href="#work" className="text-neutral-500 hover:text-neutral-900 transition-colors uppercase text-[10px] tracking-[0.2em] font-medium">
                    Work
                </a>
            </div>
        </footer>

      </main>
    </div>
  );
}
