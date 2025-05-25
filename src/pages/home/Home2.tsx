import Header2 from "@/Notification/Header2";
import LandingPage2 from "./LandingPage2";

const Home2 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with dark theme */}
      <Header2 />
      
      {/* Main content with seamless transition */}
      <main className="flex-1">
        <LandingPage2 />
      </main>

      {/* Optional footer can be added here */}
    </div>
  );
};

export default Home2;