import { useState } from "react";
import { Home } from "./Home";
import { Controls } from "./Controls";
import { Finish } from "./Finish";
import { Fail } from "./Fail";
import { Game } from "../lib/game";

export const App = () => {
  const [page, setPage] = useState("page-home");
  const [time, setTime] = useState(0);

  const start = () => {
    let game = new Game();
    game.start({
      onFail: () => {
        setPage("page-fail");
      },
      onFinish: (time) => {
        setPage("page-finish");
        setTime(time);
      },
    });
  };

  switch (page) {
    case "page-home":
      return <Home setPage={setPage} />;
    case "page-controls":
      return <Controls setPage={setPage} onStart={start} />;
    case "page-finish":
      return <Finish setPage={setPage} onRestart={start} time={time} />;
    case "page-fail":
      return <Fail setPage={setPage} onRestart={start} />;
    default:
      return <></>;
  }
};
