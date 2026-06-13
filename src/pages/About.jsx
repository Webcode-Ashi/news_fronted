import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | magni-fi-Idea</title>
        <meta name="description" content="Learn about our mission to deliver transparent global news." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-24 font-sans text-lg text-text-secondary leading-relaxed">
        <h1 className="text-5xl md:text-7xl font-serif font-black text-text-primary mb-12 tracking-tighter">
          About magni-fi-Idea.
        </h1>
        
        <p className="mb-6">
          This platform was created to demonstrate a world-class AI news intelligence platform powered by React, Tailwind CSS, GSAP, and a Node.js backend.
        </p>

        <h2 className="text-3xl font-serif font-bold text-text-primary mt-12 mb-6">Our Mission</h2>
        <p className="mb-6">
          To build a modern, high-performance, accessible newsroom experience that feels incredibly premium. By separating AI insights from the core editorial content, we aim to provide readers with an intelligent and objective view of the world.
        </p>

        <h2 className="text-3xl font-serif font-bold text-text-primary mt-12 mb-6">Technology Stack</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Frontend:</strong> React 19, Vite, Tailwind CSS 3, React Router DOM, React Helmet Async.</li>
          <li><strong>Animations:</strong> GSAP & ScrollTrigger for elegant scroll and hover interactions.</li>
          <li><strong>Data Fetching:</strong> React Query & Axios for robust caching, background updates, and API interceptors.</li>
          <li><strong>Backend:</strong> Node.js, Express, MongoDB.</li>
        </ul>
      </div>
    </>
  );
};

export default About;
