import { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Shrink } from "lucide-react";

import { Toaster } from "@/components/ui/sonner"
import Header from '@/components/Header'
import PomodoroTimer from '@/components/PomodoroTimer'

import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button";
import { HIDE_ESC_FS_BUTTON_TIMEOUT } from "@/utils/constants";

function App() {
  const fsHandle = useFullScreenHandle();

  const handleToggleFullScreen = () => {
    fsHandle.active ? fsHandle.exit() : fsHandle.enter()
  }

  const [escFSVisible, setEscFSVisible] = useState(true);
  const [mouseActiveTimer, setMouseActiveTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setEscFSVisible(true);
      if (mouseActiveTimer) clearTimeout(mouseActiveTimer);
      const newTimer = setTimeout(() => setEscFSVisible(false), HIDE_ESC_FS_BUTTON_TIMEOUT);
      setMouseActiveTimer(newTimer);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseActiveTimer) clearTimeout(mouseActiveTimer);
    };
  }, [mouseActiveTimer]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-screen h-screen flex flex-col p-4 bg-neutral-50 dark:bg-neutral-800 relative">
        <Header isFullScreen={fsHandle.active} onToggleFullScreen={handleToggleFullScreen} />

        <FullScreen handle={fsHandle} className="flex-1 flex items-center justify-center bg-neutral-50 dark:bg-neutral-800">
          <PomodoroTimer />
          {fsHandle.active &&
            <Button
              className={`
                fixed bottom-24 left-1/2 -translate-x-1/2
                hover:scale-110 transition-transform duration-200
                transition-all duration-300
                ${escFSVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                hover:scale-110
                bg-neutral-50
                text-neutral-800
                border-neutral-800
                dark:bg-neutral-800
                dark:text-neutral-50
                dark:border-neutral-50
              `}
              variant="ghost"
              onClick={fsHandle.exit}>
              <Shrink /> <span className="hidden sm:inline">Click to escape</span>
            </Button>
          }
        </FullScreen>
      </div>
      <Toaster position="top-center" />
    </ThemeProvider>
  )
}

export default App;