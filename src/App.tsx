import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import RainCanvas from './components/RainCanvas';
import ParticleCanvas from './components/ParticleCanvas';

export default function App() {
  const [shot, setShot] = useState(0); // 0 = start screen, 1 = storm, 2 = messenger, 3 = offering, 4 = divine, 5 = title

  useEffect(() => {
    if (shot === 0) return;

    let timeout: NodeJS.Timeout;
    if (shot === 1) {
      timeout = setTimeout(() => setShot(2), 4000); // 0-4s
    } else if (shot === 2) {
      timeout = setTimeout(() => setShot(3), 4000); // 4-8s
    } else if (shot === 3) {
      timeout = setTimeout(() => setShot(4), 6000); // 8-14s
    } else if (shot === 4) {
      timeout = setTimeout(() => setShot(5), 3000); // 14-17s
    }

    return () => clearTimeout(timeout);
  }, [shot]);

  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden selection:bg-transparent">
      
      {/* 0. START SCREEN */}
      <AnimatePresence>
        {shot === 0 && (
          <motion.div 
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <button 
              onClick={() => setShot(1)}
              className="text-[#D4AF37] font-cinzel text-xl md:text-2xl tracking-[0.3em] uppercase hover:text-white transition-colors duration-500 title-glow"
            >
              Enter the Divine
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. THE STORM (0-4s) */}
      <AnimatePresence>
        {shot >= 1 && shot <= 1 && (
          <motion.div 
            key="shot1"
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <div className="absolute inset-0 bg-[#020202] lightning-flash" />
            <RainCanvas intensity={1.5} lightning={true} />
            <ParticleCanvas embers={true} direction="up" density={0.3} />
            
            {/* Vague temple silhouette */}
            <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black via-black to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-8 pb-20 items-center opacity-30">
              <motion.div 
                className="w-1 h-full bg-gradient-to-b from-transparent to-[#D4AF37] mb-8"
                animate={{ scaleY: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            <div className="absolute inset-0 smoke-overlay opacity-80" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE MESSENGER (4-8s) */}
      <AnimatePresence>
        {shot >= 2 && shot <= 2 && (
          <motion.div 
            key="shot2"
            className="absolute inset-0 z-20 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
          >
            {/* Glowing floor reflection */}
            <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[#D4AF37]/10 to-transparent" />
            <ParticleCanvas gold={true} petals={true} direction="down" density={0.5} />
            
            {/* Abstract representation of the invitation in Mushak's mouth */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-8 border border-[#D4AF37]/50 bg-[#F9E596]/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              animate={{ 
                y: [0, -5, 0, -5, 0], 
                x: [0, 5, 10, 15, 20] 
              }}
              transition={{ duration: 4, ease: "linear" }}
            >
               <div className="w-4 h-4 rounded-full bg-[#AA7C11] shadow-[0_0_10px_#AA7C11]" />
            </motion.div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. THE OFFERING (8-14s) */}
      <AnimatePresence>
        {shot >= 3 && shot <= 3 && (
          <motion.div 
            key="shot3"
            className="absolute inset-0 z-30 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }} // sharp cut to black
          >
            {/* Intense light from offscreen right */}
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-[50%] bg-gradient-to-l from-[#D4AF37]/40 to-transparent mix-blend-screen"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 3, delay: 1 }}
            />
            
            <ParticleCanvas petals={true} gold={true} direction="float" density={1.5} />
            
            {/* Invitation rising */}
            <motion.div 
              className="absolute bottom-[30%] left-[40%] w-24 h-12 border border-[#D4AF37] bg-[#F9E596]/10 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.5)] z-40"
              initial={{ y: 50, rotate: -5, scale: 0.8 }}
              animate={{ y: 0, rotate: 0, scale: 1 }}
              transition={{ duration: 4, ease: "easeOut" }}
            >
               <div className="w-6 h-6 rounded-full bg-[#AA7C11] flex items-center justify-center shadow-[0_0_15px_#AA7C11]">
                 <span className="text-black font-cinzel text-[10px] font-bold opacity-80">ॐ</span>
               </div>
            </motion.div>

            {/* Light getting brighter before cut */}
            <motion.div 
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0, 0.8, 1] }}
              transition={{ duration: 6, times: [0, 0.8, 0.9, 0.95, 1] }}
            />
            <div className="absolute inset-0 smoke-overlay opacity-60 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. THE DIVINE RESPONSE (14-17s) */}
      <AnimatePresence>
        {shot >= 4 && shot <= 4 && (
          <motion.div 
            key="shot4"
            className="absolute inset-0 z-40 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            {/* Burst of light */}
            <motion.div 
              className="absolute inset-0 bg-[#D4AF37]"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            <ParticleCanvas gold={true} embers={true} direction="float" density={2} />
            
            {/* Floating invitation */}
            <motion.div 
              className="w-32 h-16 border-2 border-[#D4AF37] bg-[#F9E596]/20 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,1)] z-50 relative"
              initial={{ scale: 0.9, rotate: 0 }}
              animate={{ scale: 1.1, rotate: [0, 2, -2, 0] }}
              transition={{ duration: 3, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
            >
               <div className="w-8 h-8 rounded-full bg-[#F9E596] flex items-center justify-center shadow-[0_0_30px_#F9E596] animate-pulse">
                 <span className="text-[#AA7C11] font-cinzel text-sm font-bold">ॐ</span>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. TITLE REVEAL (17-22s) */}
      <AnimatePresence>
        {shot >= 5 && (
          <motion.div 
            key="shot5"
            className="absolute inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
          >
            <div className="absolute inset-0 god-rays pointer-events-none" />
            <ParticleCanvas embers={true} gold={true} direction="up" density={0.5} />
            <div className="absolute inset-0 smoke-overlay opacity-40 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="space-y-4"
              >
                <h3 className="font-sans text-sm md:text-base tracking-[0.4em] text-[#D4AF37] uppercase font-light">
                  Krishna Nagar Yuvak Mandal
                </h3>
                <h4 className="font-sans text-xs md:text-sm tracking-[0.5em] text-white/60 uppercase">
                  Presents
                </h4>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 2 }}
              >
                <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#F9E596] via-[#D4AF37] to-[#AA7C11] title-glow pb-2">
                  2nd Year<br/>Ganesh Mahotsav
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 3.5 }}
                className="space-y-6"
              >
                <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-[#D4AF37]/80 uppercase">
                  Coming this Ganesh Chaturthi
                </p>
                <h2 className="font-cinzel text-xl md:text-3xl font-semibold tracking-widest text-white title-glow">
                  GANPATI BAPPA MORYA 🙏
                </h2>
              </motion.div>
            </div>
            
            {/* Replay Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 7, duration: 1 }}
              onClick={() => setShot(1)}
              className="absolute bottom-10 font-sans text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300"
            >
              Replay Teaser
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}

