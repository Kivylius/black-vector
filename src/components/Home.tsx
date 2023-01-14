export const Home = ({ setPage }: { setPage: (s: string) => void }) => {
  return (
    <div className="main-menu page-home">
      <h1>BLACK VECTOR</h1>
      <div className="controls">
        <button onClick={() => setPage("page-controls")}>Start</button>
        <button onClick={() => setPage("page-controls")}>Controls</button>
        <button
          onClick={() => {
            //@ts-ignore
            // eslint-disable-next-line no-restricted-globals
            window.open(location, "_self").close();
          }}
        >
          Exit
        </button>
      </div>
      <small>
        <i>kivylius.com Games</i>
      </small>
      <br />
    </div>
  );
};
