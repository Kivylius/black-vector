export const Controls = ({
  setPage,
  onStart,
}: {
  setPage: (s: string) => void;
  onStart: () => void;
}) => {
  return (
    <div className="main-menu page-controls">
      <h1>Controls</h1>
      <h2>
        [W], [A], [S], [D] or Arrow keys. [space] to stop movement. [mouse1] to
        shoot.
      </h2>
      <div className="controls">
        <button
          onClick={() => {
            setPage("page-start");
            onStart();
          }}
        >
          Start
        </button>
        <button onClick={() => setPage("page-home")}>Back</button>
      </div>
    </div>
  );
};
