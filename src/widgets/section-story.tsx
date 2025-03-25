
type StoryCircleType = {
  children: React.ReactNode; 
};

const StorySection: React.FC<StoryCircleType> = ({ children }) => {
  return (
    <div>
      <section className="lg:flex hidden gap-[30px] py-[50px] items-center">
        {children} 
      </section>
    </div>
  );
};

export default StorySection;
