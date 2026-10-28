
import { useState, useRef, useEffect } from 'react'
import '../css/csscolor/basicnode.css'



const statusColors = {
    gesperrt: '#A32D2D',
    offen: '#1f7c03',
    'in Arbeit': '#1727ba',
    abgenommen: '#E97132',
};
const categoryIcons = {
    coding: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 4L2 12l6 8M16 4l6 8-6 8" />
        </svg>
    ),
    ui: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 9h18" />
        </svg>
    ),
    server: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="4" y="3" width="16" height="6" rx="1" />
            <rect x="4" y="15" width="16" height="6" rx="1" />
            <path d="M8 6h.01M8 18h.01" />
        </svg>
    ),
};
const DRAG_THRESHOLD = 4;

export const Node = ({ data, isSelected, onMove, onSelect, onResize }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState(data.position || { x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);

    const dragInfo = useRef({
        startX: 0, startY: 0, originX: 0, originY: 0,
        lastX: 0, lastY: 0, moved: false,
    });
    const nodeRef = useRef(null);

    useEffect(() => {
        const el = nodeRef.current;
        if (!el) return;

        const observer = new ResizeObserver(() => {
            const { offsetWidth, offsetHeight } = el;
            onResize(data.id, { width: offsetWidth, height: offsetHeight });
        });
        observer.observe(el);

        return () => observer.disconnect();
    }, [data.id]);

    const handlePointerDown = (e) => {
        dragInfo.current = {
            startX: e.clientX,
            startY: e.clientY,
            originX: position.x,
            originY: position.y,
            lastX: position.x,
            lastY: position.y,
            moved: false,
        };
        setIsDragging(true);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    const handlePointerMove = (e) => {
        const dx = e.clientX - dragInfo.current.startX;
        const dy = e.clientY - dragInfo.current.startY;

        if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
            dragInfo.current.moved = true;
        }

        const x = dragInfo.current.originX + dx;
        const y = dragInfo.current.originY + dy;
        dragInfo.current.lastX = x;
        dragInfo.current.lastY = y;
        setPosition({ x, y });
        onMove(data.id, { x, y });
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
    };

    const handleBodyClick = () => {
        if (dragInfo.current.moved) return;
        if (data.status === 'gesperrt') return;
        onSelect(data.id);
    };

    const handleToggleClick = (e) => {
        e.stopPropagation();
        if (data.status === 'gesperrt') return;
        setIsOpen(!isOpen);
    };

    /* const select = document.getElementById("selectstatus"); */
    /* const outgo = document.getElementById("ausgabe"); */
    /* web alert works when changing the select value, but I want to change the value of the node.status when changing the select value. */
    /*I thick its bcs of the data.status is a prop and not a state, so I need to change the data.status to a state and then change the state when changing the select value. */

    return (
        <div
            ref={nodeRef}
            className={`node-div${isOpen ? ' open' : ''}${isDragging ? ' dragging' : ''}${isSelected ? ' selected' : ''}${data.status === 'gesperrt' ? ' locked' : ''}`}
            style={{
                left: position.x,
                top: position.y,
                '--status-color': statusColors[data.status],
            }}
            onPointerDown={handlePointerDown}
            onClick={handleBodyClick}
        >
            <div className="node-shell">
                <div className="node-frame">


                    <div className="node-header">

                        <select

                            className="node-status-pill"
                            style={{ '--status-color': statusColors[data.status] }}
                            value={data.status}
                            onChange={(e) => data.onStatusChange(id, e.target.value)}

                        >
                            <option value="offen">offen</option>
                            <option value="in Arbeit">in Arbeit</option>
                            <option value="abgenommen">abgenommen</option>
                            <option value="gesperrt">gesperrt</option>
                        </select >
                        <span className="node-title">{data.title}</span>
                    </div>
                    <div className="node-body">

                        <div className="node-side">
                            <span className="node-icon">{categoryIcons[data.kategorie]}</span>
                        </div>


                        <div className="node-main-border">
                            <div className="node-main">
                                <div className="node-main-content">
                                    {!isOpen && <div className="node-bs">{data.shortver}</div>}

                                    <div className={`node-detail-wrapper${isOpen ? ' open' : ''}`}>
                                        <div className="node-detail-inner">
                                            <div className="node-detail">
                                                <div className="node-row">
                                                    <span className="node-label">Stufe</span>
                                                    <div className="node-value">{data.stufe}</div>
                                                </div>
                                                <div className="node-row">
                                                    <span className="node-label">Voraussetzungen</span>
                                                    <ul className="node-value">
                                                        {data.voraussetzungen.map((id) => (
                                                            <li key={id}>{id}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="node-row">
                                                    <span className="node-label">Ziel</span>
                                                    <div className="node-value">{data.ziel}</div>
                                                </div>
                                                <div className="node-row">
                                                    <span className="node-label">Deliverable</span>
                                                    <div className="node-value">{data.deliverable}</div>
                                                </div>
                                                <div className="node-row">
                                                    <span className="node-label">Abnahme</span>
                                                    <ul className="node-value">
                                                        {data.abnahme.map((kriterium, i) => (
                                                            <li key={i}>{kriterium}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="node-row">
                                                    <span className="node-label">Nachweis</span>
                                                    <div className="node-value">
                                                        {data.nachweis.datum}
                                                        {data.nachweis.commit && <> — <a href={data.nachweis.commit} target="_blank" rel="noreferrer">Commit</a></>}
                                                    </div>
                                                </div>
                                                <div className="node-row">
                                                    <span className="node-label">Status</span>
                                                    <div className="node-value">{data.status}</div>
                                                </div>
                                                <div className="node-row">
                                                    <span className="node-label">Reflexion</span>
                                                    <div className="node-value">{data.reflexion}</div>
                                                </div>
                                                <div className="node-row">
                                                    <span className="node-label">Bildungsplan</span>
                                                    <div className="node-value">{data.bildungsplan}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="node-main-footer">
                                    <div className="node-stufe-badge">
                                        <span>Stufe {data.stufe}</span>
                                    </div>
                                    <svg
                                        className={`node-toggle${isOpen ? ' open' : ''}`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        onClick={handleToggleClick}
                                    >
                                        <path className="toggle-outline" d="M12 6v12M6 12h12" />
                                        <path className="toggle-fill" d="M12 6v12M6 12h12" />
                                    </svg>
                                    {/* <p id="outgo">Noch nichts ausgewählt.</p> (muss noch position Styling usw machen geht momentan nicht, Jsx code für diese funktion schon drin)*/}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
