import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    count: 5000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 125,
    overscan: 2,
  });

  return (
    <>
      <button onClick={() => virtualizer.scrollToIndex(100)}>
        ScrollToBla
      </button>
      <div
        ref={parentRef}
        style={{ width: 400, height: 400, overflow: "auto" }}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              ref={(e) => {
                console.log("measure", e);
                virtualizer.measureElement(e);
              }}
              key={virtualItem.index}
              className={virtualItem.index % 2 ? "even" : "odd"}
              data-index={virtualItem.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              Row number : {virtualItem.index}
              <NewDynamicElement />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function NewDynamicElement() {
  return (
    <details>
      <summary>Great content summary</summary>
      {lorem}
    </details>
  );
}

const lorem =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

export default App;
