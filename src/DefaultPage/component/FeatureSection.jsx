import React, { useState, useRef, useEffect, useMemo } from 'react';
import Modal from 'react-modal';
import img8 from '../assets/Icons/light-bulb.png';
import img9 from '../assets/Icons/education.png';
import img10 from '../assets/Icons/suitcase.png';

// ربط Modal بـ root (يفترض أن يتم في index.js)
Modal.setAppElement('#root');

function FeatureSection() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  // Define refs at the top level
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  // Memoize the array of refs
  const cardRefs = useMemo(() => [ref1, ref2, ref3], [ref1, ref2, ref3]);

  // إضافة تأثير الميل عند الـ hover
  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (y - centerY) / centerY;
      const tiltY = (centerX - x) / centerX;

      cancelAnimationFrame(card.animationFrameId);
      card.animationFrameId = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${tiltX * 5}deg) rotateY(${tiltY * 5}deg) scale(1.05)`;
      });
    };

    const handleMouseLeave = (e) => {
      const card = e.currentTarget;
      cancelAnimationFrame(card.animationFrameId);
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    cardRefs.forEach((ref) => {
      if (ref.current) {
        const card = ref.current;
        card.style.transition = 'transform 0.2s ease-out';
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    return () => {
      cardRefs.forEach((ref) => {
        if (ref.current) {
          const card = ref.current;
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
          cancelAnimationFrame(card.animationFrameId);
        }
      });
    };
  }, [cardRefs]);

  const openModal = (url) => {
    setCurrentVideoUrl(url);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentVideoUrl('');
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-[30px] font-bold mb-6 text-gray-800">
          Designed for Every AI Journey. for Developers, Enthusiasts, and Teams
        </h2>
        <p className="text-lg text-[#555] font-semibold mb-10 max-w-2xl mx-auto">
          Whether you're just starting or an experienced AI professional, AINO adapts to support your unique needs.
        </p>
        <div className="mt-[110px] flex flex-col md:flex-row gap-5 justify-center items-center mb-[50px] max-w-5xl mx-auto">
          <div
            ref={cardRefs[0]}
            className="bg-[#e8f4ff] rounded-xl p-8 w-[300px] text-center shadow-[0_4px_8px_rgba(0,0,0,0.1)]
              transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_8px_16px_rgba(255,0,0,0.3)]
              hover:border-[1.5px] hover:border-[rgba(255,0,0,0.3)] hover:cursor-pointer"
          >
            <img src={img8} alt="Innovators Icon" className="w-20 h-20 object-contain mb-5 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">For Innovators and AI Experts</h3>
            <p className="text-gray-600 mt-10 min-h-[120px]">
              Start your AI journey with guided workflows, tutorials, an intuitive interface that demystifies AI development and helps you build skills as you go.
            </p>
            <div className="mt-5">
              {/* <button
                onClick={() => openModal('https://www.youtube.com/embed/w-m8p-o65UA?si=1ZpI5LMNZJmSaj81')}
                className="text-[#007bff] font-semibold hover:underline"
              >
                Watch demo →
              </button> */}
            </div>
          </div>
          <div
            ref={cardRefs[1]}
            className="bg-[#e8f4ff] rounded-xl p-8 w-[300px] text-center shadow-[0_4px_8px_rgba(0,0,0,0.1)]
              transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_8px_16px_rgba(255,0,0,0.3)]
              hover:border-[1.5px] hover:border-[rgba(255,0,0,0.3)] hover:cursor-pointer"
          >
            <img src={img9} alt="Learners Icon" className="w-20 h-20 object-contain mb-5 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">For Learners and New Developers</h3>
            <p className="text-gray-600 mt-10 min-h-[120px]">
              Begin your AI journey with guided workflows, tutorials, and an intuitive interface that demystifies AI development and helps you build skills as you go.
            </p>
            <div className="mt-5">
              {/* <button
                onClick={() => openModal('https://www.youtube.com/embed/w-m8p-o65UA?si=1ZpI5LMNZJmSaj81')}
                className="text-[#007bff] font-semibold hover:underline"
              >
                Watch demo →
              </button> */}
            </div>
          </div>
          <div
            ref={cardRefs[2]}
            className="bg-[#e8f4ff] rounded-xl p-8 w-[300px] text-center shadow-[0_4px_8px_rgba(0,0,0,0.1)]
              transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_8px_16px_rgba(255,0,0,0.3)]
              hover:border-[1.5px] hover:border-[rgba(255,0,0,0.3)] hover:cursor-pointer"
          >
            <img src={img10} alt="Teams Icon" className="w-20 h-20 object-contain mb-5 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">For Agile Teams and Enterprises</h3>
            <p className="text-gray-600 mt-10 min-h-[120px]">
              Accelerate your team’s AI projects with scalable solutions and collaborative tools, ensuring quick, impactful results for your organization.
            </p>
            <div className="mt-5">
              {/* <button
                onClick={() => openModal('https://www.youtube.com/embed/w-m8p-o65UA?si=1ZpI5LMNZJmSaj81')}
                className="text-[#007bff] font-semibold hover:underline"
              >
                Watch demo →
              </button> */}
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '800px',
              padding: '0',
              border: 'none',
              background: 'transparent',
              borderRadius: '8px',
              overflow: 'hidden',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: 1000,
            },
          }}
          aria={{
            labelledby: 'modal-title',
            describedby: 'modal-description',
          }}
        >
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-red-500 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Close video modal"
            >
              X
            </button>
            <iframe
              width="100%"
              height="450"
              src={currentVideoUrl}
              title="Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </Modal>
      </div>
    </section>
  );
}

export default FeatureSection;