import PassageViewer from './components/PassageViewer';
import AIChatPanel from './components/AIChatPanel';

function App() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative font-sans">
      <PassageViewer />

      <div className="w-1/3 min-w-[340px] max-w-[420px] h-full z-10 hidden md:block">
        <AIChatPanel />
      </div>
    </div>
  );
}

export default App;
