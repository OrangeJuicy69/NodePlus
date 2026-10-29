import { useEffect, useRef, useCallback } from "react";

const MIN_SCALE = 0.6;
const MAX_SCALE = 2;

export function Workspace({ width = 3000, height = 2000, children }) {
  const viewportRef = useRef(null);
  const workspaceRef = useRef(null);

  // Ansicht liegt in einem Ref, damit beim Zoomen/Schwenken kein React-Re-Render passiert
  const view = useRef({ x: 0, y: 0, scale: 1 });
  const spaceDown = useRef(false);

  const apply = useCallback(() => {
    const { x, y, scale } = view.current;
    workspaceRef.current.style.transform =
      `translate(${x}px, ${y}px) scale(${scale})`;
  }, []);

  // Zoom um einen Punkt (px, py) relativ zum Viewport
  const zoomAt = useCallback((px, py, newScale) => {
    const v = view.current;
    const s = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
    v.x = px - ((px - v.x) / v.scale) * s;
    v.y = py - ((py - v.y) / v.scale) * s;
    v.scale = s;
    apply();
  }, [apply]);

  useEffect(() => {
    const viewport = viewportRef.current;

    // Muss nativ registriert werden: Reacts onWheel ist passiv,
    // dort funktioniert preventDefault() nicht.
    const onWheel = (e) => {
      e.preventDefault();
      const v = view.current;

      if (e.ctrlKey || e.metaKey) {
        // Mausrad + Strg/Cmd oder Trackpad-Pinch = Zoom
        const rect = viewport.getBoundingClientRect();
        const factor = Math.exp(-e.deltaY * 0.01);
        zoomAt(e.clientX - rect.left, e.clientY - rect.top, v.scale * factor);
      } else {
        // normales Scrollen = Verschieben
        v.x -= e.deltaX;
        v.y -= e.deltaY;
        apply();
      }
    };

    // Pan: Mittelklick oder Leertaste + Linksklick
    let dragging = false;
    let startX = 0;
    let startY = 0;

    const onPointerDown = (e) => {
      if (e.button === 1 || (e.button === 0 && spaceDown.current)) {
        dragging = true;
        startX = e.clientX - view.current.x;
        startY = e.clientY - view.current.y;
        viewport.setPointerCapture(e.pointerId);
        viewport.classList.add('panning');
      }
    };
    const onPointerMove = (e) => {
      if (!dragging) return;
      view.current.x = e.clientX - startX;
      view.current.y = e.clientY - startY;
      apply();
    };
    const onPointerUp = () => {
      dragging = false;
      viewport.classList.remove('panning');
    };

    const onKeyDown = (e) => {
      if (e.code === 'Space' && !/INPUT|TEXTAREA/.test(e.target.tagName)) {
        spaceDown.current = true;
        e.preventDefault();
      }
    };
    const onKeyUp = (e) => {
      if (e.code === 'Space') spaceDown.current = false;
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    apply();

    return () => {
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [apply, zoomAt]);

  const zoomButton = (factor) => {
    const rect = viewportRef.current.getBoundingClientRect();
    zoomAt(rect.width / 2, rect.height / 2, view.current.scale * factor);
  };

  const reset = () => {
    view.current = { x: 0, y: 0, scale: 1 };
    apply();
  };

  return (
    <div className="viewport" ref={viewportRef}>
      <div
        className="workspace"
        ref={workspaceRef}
        style={{ width, height }}
      >
        {children}
      </div>

      <div className="zoom-controls">
        <button onClick={() => zoomButton(1.1)}>+</button>
        <button onClick={() => zoomButton(1 / 1.1)}>-</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}