import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Footer } from '../components/Footer';

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  heroImage: string;
  summary: string;
  content: {
    text: string;
    image?: string;
    imageCaption?: string;
  }[];
  author?: string;
}

interface NewsArticlePageProps {
  article: NewsArticle;
  onBack: () => void;
}

export default function NewsArticlePage({ article, onBack }: NewsArticlePageProps) {
  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-y-auto overflow-x-hidden relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1400px] mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[#1e3856] hover:text-[#152b40] hover:gap-3 transition-all duration-200 font-['IBM_Plex_Sans',sans-serif] font-semibold mb-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <ArrowLeft className="w-5 h-5" />
            Tillbaka
          </button>

          {/* Hero Image */}
          <div className="relative w-full h-[400px] md:h-[500px]">
            <ImageWithFallback
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="px-4 py-6 md:py-12 w-full max-w-[calc(680px+96px)] mx-auto md:px-[48px]">
            {/* Date */}
            <p className="font-['IBM_Plex_Sans',sans-serif] text-gray-500 text-sm mb-4" style={{ fontVariationSettings: "'wdth' 100" }}>
              {article.date}
            </p>

            {/* Title */}
            <h1 className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[24px] md:text-[32px] text-[#1e3856] mb-4" style={{ fontVariationSettings: "'wdth' 100" }}>
              {article.title}
            </h1>

            {/* Summary */}
            <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-gray-700 text-lg mb-8 leading-relaxed" style={{ fontVariationSettings: "'wdth' 100" }}>
              {article.summary}
            </p>

            {/* Author */}
            {article.author && (
              <div className="flex items-center gap-2 mb-8 pb-8 border-b border-gray-200">
                <span className="font-['IBM_Plex_Sans',sans-serif] text-gray-600" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Av
                </span>
                <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {article.author}
                </span>
              </div>
            )}

            {/* Article Body */}
            <div className="space-y-8">
              {article.content.map((section, index) => (
                <div key={index}>
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-gray-800 text-[18px] leading-[1.7]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {section.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Related Articles CTA */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={onBack}
                className="w-full md:w-auto px-8 py-3 bg-[#1e3856] text-white font-['IBM_Plex_Sans',sans-serif] hover:bg-[#152b40] hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Se fler nyheter
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}