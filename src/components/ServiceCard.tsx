interface ServiceCardProps {
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  onClick: () => void;
}

export function ServiceCard({ title, description, buttonText, imageUrl, onClick }: ServiceCardProps) {
  return (
    <div 
      className="bg-white border border-[#e4e4e4] cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col"
      onClick={onClick}
    >
      <div className="content-stretch flex flex-col h-full isolate items-start justify-center relative w-full">
        {/* Image */}
        <div className="h-[210px] relative shrink-0 w-full z-[2]">
          <img 
            alt={title} 
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
            src={imageUrl} 
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 bg-white flex flex-col relative shrink-0 w-full z-[1]">
          <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative h-full">
            <div className="content-stretch flex flex-col gap-[16px] flex-1 items-start leading-[normal] relative shrink-0 text-[#021c20] w-full">
              <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                {title}
              </p>
              <p className="font-['IBM_Plex_Sans',sans-serif] font-normal relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                {description}
              </p>
            </div>
            
            <button className="bg-[#1e3856] h-[60px] relative shrink-0 w-full hover:bg-[#2d4a6b] transition-colors">
              <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="box-border content-stretch flex flex-col gap-[10px] h-[60px] items-center justify-center px-[16px] py-[8px] relative w-full">
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-white uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {buttonText}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
