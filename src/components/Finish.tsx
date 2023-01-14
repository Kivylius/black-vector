export const Finish = ({
  setPage,
  onRestart,
  time,
}: {
  setPage: (s: string) => void;
  onRestart: () => void;
  time: number;
}) => {
  return (
    <div className="main-menu page-finish">
      <h1>You Win!</h1>
      <h2>Time Score: {time} seconds</h2>

      <div className="controls">
        <button
          onClick={() => {
            setPage("page-start");
            onRestart();
          }}
        >
          Restart
        </button>
        <button onClick={() => setPage("page-home")}>Back to main menu</button>
      </div>
    </div>
  );
};
