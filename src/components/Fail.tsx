export const Fail = ({
  setPage,
  onRestart,
}: {
  setPage: (s: string) => void;
  onRestart: () => void;
}) => {
  return (
    <div className="main-menu page-fail">
      <h1>FAIL!</h1>
      <h2>You have died! Try again</h2>
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
