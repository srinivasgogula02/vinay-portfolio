import { PlusIcon, Aperture, Video, Sparkles, Mic, Palette, MonitorPlay, Wand2, Film } from "lucide-react";
import { cn } from "@/lib/utils";

type Logo = {
  src?: string;
  icon?: React.ReactNode;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x border-neutral-200 md:grid-cols-4",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-neutral-200" />

      <LogoCard
        className="relative border-r border-b border-neutral-200 bg-neutral-50/50"
        logo={{
          icon: <div className="flex items-center gap-2"><div className="w-8 h-8 bg-purple-900 rounded-lg flex items-center justify-center text-purple-200 font-bold font-sans">Pr</div><span className="font-bold text-neutral-800">Premiere Pro</span></div>,
          alt: "Premiere Pro",
        }}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-neutral-400"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b border-neutral-200 md:border-r"
        logo={{
          icon: <div className="flex items-center gap-2"><div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-blue-200 font-bold font-sans">Ae</div><span className="font-bold text-neutral-800">After Effects</span></div>,
          alt: "After Effects",
        }}
      />

      <LogoCard
        className="relative border-r border-b border-neutral-200 md:bg-neutral-50/50"
        logo={{
          icon: <div className="flex items-center gap-2"><Aperture className="w-8 h-8 text-neutral-800" /><span className="font-bold text-neutral-800">DaVinci Resolve</span></div>,
          alt: "DaVinci Resolve",
        }}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-neutral-400"
          strokeWidth={1}
        />
        <PlusIcon
          className="-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block text-neutral-400"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="relative border-b border-neutral-200 bg-neutral-50/50 md:bg-white"
        logo={{
          icon: <div className="flex items-center gap-2"><Palette className="w-8 h-8 text-cyan-600" /><span className="font-bold text-neutral-800">Canva</span></div>,
          alt: "Canva",
        }}
      />

      <LogoCard
        className="relative border-r border-b border-neutral-200 bg-neutral-50/50 md:border-b-0 md:bg-white"
        logo={{
          icon: <div className="flex items-center gap-2"><Mic className="w-8 h-8 text-neutral-800" /><span className="font-bold text-neutral-800">ElevenLabs</span></div>,
          alt: "ElevenLabs",
        }}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] md:-left-[12.5px] absolute z-10 size-6 md:hidden text-neutral-400"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b border-neutral-200 bg-white md:border-r md:border-b-0 md:bg-neutral-50/50"
        logo={{
          icon: <div className="flex items-center gap-2"><Sparkles className="w-8 h-8 text-purple-500" /><span className="font-bold text-neutral-800">Midjourney</span></div>,
          alt: "Midjourney",
        }}
      />

      <LogoCard
        className="border-r border-neutral-200"
        logo={{
          icon: <div className="flex items-center gap-2"><Wand2 className="w-8 h-8 text-neutral-800" /><span className="font-bold text-neutral-800">Runway AI</span></div>,
          alt: "Runway AI",
        }}
      />

      <LogoCard
        className="bg-neutral-50/50"
        logo={{
          icon: <div className="flex items-center gap-2"><Film className="w-8 h-8 text-neutral-800" /><span className="font-bold text-neutral-800">CapCut Pro</span></div>,
          alt: "CapCut",
        }}
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-neutral-200" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-white px-4 py-10 md:p-12",
        className
      )}
      {...props}
    >
      {logo.icon ? (
        <div className="pointer-events-none select-none">
          {logo.icon}
        </div>
      ) : logo.src ? (
        <img
          alt={logo.alt}
          className="pointer-events-none h-6 select-none md:h-8 object-contain"
          height={logo.height || "auto"}
          src={logo.src}
          width={logo.width || "auto"}
        />
      ) : null}
      {children}
    </div>
  );
}
