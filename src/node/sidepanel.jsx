import { useRef } from 'react'
import '../css/csscolor/basicnode.css'

export const Sidepanel = ({ node, onClose }) => {
    
    const lastNode = useRef(null)
    if (node) lastNode.current = node
    const shown = lastNode.current

    return (
        <div className={`node-sidepanel${node ? ' open' : ''}`}>
            <button className="node-sidepanel-close" onClick={onClose}>✕</button>
            {shown && (
                <>
                    <p className="node-sidepanel-title">{shown.title}</p>
                    <div className="node-row">
                        <span className="node-label">Stufe</span>
                        <div className="node-value">{shown.stufe}</div>
                    </div>
                    <div className="node-row">
                        <span className="node-label">Voraussetzungen</span>
                        <ul className="node-value">
                            {shown.voraussetzungen.map((id) => (
                                <li key={id}>{id}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="node-row">
                        <span className="node-label">Ziel</span>
                        <div className="node-value">{shown.ziel}</div>
                    </div>
                    <div className="node-row">
                        <span className="node-label">Deliverable</span>
                        <div className="node-value">{shown.deliverable}</div>
                    </div>
                    <div className="node-row">
                        <span className="node-label">Abnahme</span>
                        <ul className="node-value">
                            {shown.abnahme.map((kriterium, i) => (
                                <li key={i}>{kriterium}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="node-row">
                        <span className="node-label">Nachweis</span>
                        <div className="node-value">
                            {shown.nachweis.datum}
                            {shown.nachweis.commit && <> — <a href={shown.nachweis.commit} target="_blank" rel="noreferrer">Commit</a></>}
                        </div>
                    </div>
                    <div className="node-row">
                        <span className="node-label">Status</span>
                        <div className="node-value">{shown.status}</div>
                    </div>
                    <div className="node-row">
                        <span className="node-label">Reflexion</span>
                        <div className="node-value">{shown.reflexion}</div>
                    </div>
                    <div className="node-row">
                        <span className="node-label">Bildungsplan</span>
                        <div className="node-value">{shown.bildungsplan}</div>
                    </div>
                </>
            )}
        </div>
    )
}