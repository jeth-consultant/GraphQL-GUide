const GridBackground = ({ children }) => {
  return (
    <div className="w-full bg-black text-white bg-grid-white/[0.2] relative">
      <div
        className="absolute pointer-events-none inset-0 bg-black"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black 80%)',
          maskImage: 'radial-gradient(ellipse at center, transparent 20%, black 80%)',
        }}
      />
      {children}
    </div>
  );
};

export default GridBackground;
