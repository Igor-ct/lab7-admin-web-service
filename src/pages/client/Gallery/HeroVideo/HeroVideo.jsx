import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styles from './HeroVideo.module.css';

const mockVideos = [
  { id: 1, title: "RTX 5080 Performance", subtitle: "Unleash the beast inside." },
  { id: 2, title: "OLED Display 240Hz", subtitle: "True blacks and vibrant colors." },
  { id: 3, title: "Liquid Cooling", subtitle: "Zero throttling under heavy load." },
  { id: 4, title: "Mechanical Keys", subtitle: "Tactile precision for gamers." },
  { id: 5, title: "All-day Battery", subtitle: "Work anywhere, play everywhere." }
];

const cloneCount = 3;

const extendedVideos = [
  ...mockVideos.slice(-cloneCount),
  ...mockVideos,
  ...mockVideos.slice(0, cloneCount)
];

export default function HeroVideo() {
  const [activeIndex, setActiveIndex] = useState(cloneCount);
  const [isJumping, setIsJumping] = useState(true); 
  const [trackOffset, setTrackOffset] = useState(0);

  const isAnimating = useRef(false);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    if (cardRefs.current[cloneCount]) {
      setTrackOffset(cardRefs.current[cloneCount].offsetLeft);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsJumping(false));
      });
    }
  }, []);

  const changeVideo = (index) => {
    if (isAnimating.current) return;

    const realIndex = index >= 0 && index < extendedVideos.length ? index : activeIndex;
    if (realIndex === activeIndex) return;

    isAnimating.current = true;

    if (cardRefs.current[realIndex] && cardRefs.current[activeIndex]) {
      const targetCard = cardRefs.current[realIndex];
      const currentActiveCard = cardRefs.current[activeIndex];

      let targetScroll = targetCard.offsetLeft;

      if (realIndex > activeIndex) {
        const shrinkAmount = currentActiveCard.offsetWidth - targetCard.offsetWidth;
        targetScroll -= shrinkAmount;
      }

      setTrackOffset(targetScroll);
    }

    setActiveIndex(realIndex);

    const firstEndCloneIndex = cloneCount + mockVideos.length;
    const lastStartCloneIndex = cloneCount - 1;

    if (realIndex > lastStartCloneIndex && realIndex < firstEndCloneIndex) {
      setTimeout(() => {
        isAnimating.current = false;
      }, 400); 
    }
  };

  const handleNext = () => changeVideo(activeIndex + 1);
  const handlePrev = () => changeVideo(activeIndex - 1);

  useEffect(() => {
    const timer = setTimeout(() => {
      const firstEndCloneIndex = cloneCount + mockVideos.length;
      const lastStartCloneIndex = cloneCount - 1;

      // Стрибок ВПЕРЕД
      if (activeIndex === firstEndCloneIndex) {
        setIsJumping(true); 
        const targetIndex = cloneCount;

        if (cardRefs.current[targetIndex]) {
          setTrackOffset(cardRefs.current[targetIndex].offsetLeft);
        }

        setActiveIndex(targetIndex);
        
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsJumping(false);
            isAnimating.current = false;
          });
        });
      }
      // Стрибок НАЗАД
      else if (activeIndex === lastStartCloneIndex) {
        setIsJumping(true); 
        const targetIndex = cloneCount + mockVideos.length - 1;

        if (cardRefs.current[activeIndex] && cardRefs.current[targetIndex]) {
          const shrinkAmount = cardRefs.current[activeIndex].offsetWidth - cardRefs.current[targetIndex].offsetWidth;
          setTrackOffset(cardRefs.current[targetIndex].offsetLeft - shrinkAmount);
        }

        setActiveIndex(targetIndex);
        
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsJumping(false);
            isAnimating.current = false; 
          });
        });
      }
    }, 400); 

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const getRealIndex = () => {
    if (activeIndex < cloneCount) {
      return mockVideos.length - cloneCount + activeIndex;
    }
    if (activeIndex >= cloneCount + mockVideos.length) {
      return activeIndex - (cloneCount + mockVideos.length);
    }
    return activeIndex - cloneCount;
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.sliderWrapper}>
        
        <button type="button" className={`${styles.navZone} ${styles.navLeft}`} onClick={handlePrev}>
          <svg className={styles.chevronIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="15 4 7 12 15 20"></polyline>
          </svg>
        </button>

        <div className={styles.trackContainer}>
          <div className={styles.bridgeLine}></div>

          <div 
            className={`${styles.track} ${isJumping ? styles.noTransition : ''}`}
            style={{ transform: `translateX(-${trackOffset}px)` }}
          >
            {extendedVideos.map((vid, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={`${vid.id}-${idx}`}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className={`${styles.card} ${isActive ? styles.activeCard : styles.inactiveCard} ${isJumping ? styles.noTransition : ''}`}
                  onClick={() => changeVideo(idx)}
                >
                  {!isActive && <div className={styles.verticalLines}></div>}

                  <div className={styles.videoPlaceholder}>
                    <span>[ 🎬 {isActive ? "MAIN PLAYER" : "Up Next"} ]</span>
                  </div>

                  <div className={styles.overlay}>
                    <h1 className={styles.title}>{vid.title}</h1>
                    <p className={styles.subtitle}>{vid.subtitle}</p>
                    <button type="button" className={styles.ctaButton}>Explore Now</button>
                  </div>

                  {!isActive && (
                    <div className={styles.inactiveTitle}>{vid.title}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button type="button" className={`${styles.navZone} ${styles.navRight}`} onClick={handleNext}>
          <svg className={styles.chevronIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="9 4 17 12 9 20"></polyline>
          </svg>
        </button>
        
      </div>

      <div className={styles.dots}>
        {mockVideos.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${idx === getRealIndex() ? styles.activeDot : ''}`}
            onClick={() => changeVideo(cloneCount + idx)}
          />
        ))}
      </div>
    </div>
  );
}