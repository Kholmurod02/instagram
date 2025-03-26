
type StoryCircleType = {
  children: React.ReactNode; 
};

const StorySection: React.FC<StoryCircleType> = ({ children }) => {
  return (
    <div>
      <section className="flex w-[90%] m-auto gap-[30px] py-[10px] items-center">
        {children} 
      </section>
    </div>
  );
};

export default StorySection;
