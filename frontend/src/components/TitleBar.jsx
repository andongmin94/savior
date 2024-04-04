function TitleBarButton({ label, children, ...props }) {
  return (
    <button
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-neutral-800 text-white transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export default function TitleBar() {
  const minimize = () => {
    window.electron.minimize();
  };
  const maximize = () => {
    window.electron.maximize();
  };
  const hidden = () => {
    window.electron.hide();
  };
  return (
    <>
    {typeof window.electron !== "undefined" && 
      <div className="fixed flex justify-end w-full bg-[#262626] z-[999]" style={{ WebkitAppRegion: "drag" }}>
        <div style={{ WebkitAppRegion: "no-drag" }}>
          <TitleBarButton label="창 최소화" onClick={minimize}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>  
          </TitleBarButton>&nbsp;
          <TitleBarButton label="창 최대화" onClick={maximize}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
          </TitleBarButton>&nbsp;
          <TitleBarButton label="창 숨기기" onClick={hidden}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </TitleBarButton>
        </div>
      </div>}
    </>
  );
}
