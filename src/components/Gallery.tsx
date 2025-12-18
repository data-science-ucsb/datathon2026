import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'; // Removed EffectFade
import datathon1 from "../assets/datathon1.jpg";
import datathon2 from "../assets/datathon2.jpeg";
import datathon3 from "../assets/datathon3.jpeg";
import datathon4 from "../assets/datathon4.jpeg";
import datathon5 from "../assets/datathon5.jpeg";
import datathon6 from "../assets/datathon6.JPG";
import datathon7 from "../assets/datathon7.JPG";
import datathon8 from "../assets/datathon8.JPG";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Removed swiper/css/effect-fade

const photos = [
  { src: datathon1, alt: "Hackathon 1", caption: "Kickoff of our 2025 Datathon" },
  { src: datathon2, alt: "Hackathon 2", caption: "Organizer + Judge Team Picture" },
  { src: datathon3, alt: "Hackathon 3", caption: "Team Presentations" },
  { src: datathon4, alt: "Hackathon 4", caption: "Team Presentations" },
  { src: datathon5, alt: "Hackathon 5", caption: "Red Bull Sponsor Break" },
  { src: datathon8, alt: "Hackathon 5", caption: "Presentation Prep + Viewing" },
  { src: datathon6, alt: "Hackathon 5", caption: "Winners & Prizes" },
  { src: datathon7, alt: "Hackathon 5", caption: "Winners & Prizes" },
];

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Previous Years</h2>
          <p className="text-gray-400">A look back at our previous Datathons!</p>
        </div>

        <div className="relative group">
          {/* Glowing Boundary Line */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          
          <div className="relative rounded-3xl bg-gray-950 border border-white/10 overflow-hidden shadow-2xl">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]} // Removed EffectFade
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              speed={800} // Added speed for a smoother swipe feel
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true, // Stops scrolling when mouse enters
              }}
              pagination={{ clickable: true }}
              navigation={true}
              className="aspect-video w-full"
            >
              {photos.map((photo, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full group/slide overflow-hidden">
                    <img 
                      src={photo.src} 
                      alt={photo.alt} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/slide:scale-105"
                    />
                    {/* Gradient overlay - visible only on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/slide:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Caption - visible only on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-12 translate-y-4 opacity-0 group-hover/slide:translate-y-0 group-hover/slide:opacity-100 transition-all duration-500 pointer-events-none">
                      <p className="text-white text-xl md:text-2xl font-medium text-center drop-shadow-2xl">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.3);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px !important;
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Gallery;