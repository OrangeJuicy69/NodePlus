import '../css/csscolor/basicnode.css'

const FALLBACK_WIDTH = 140
const FALLBACK_HEIGHT = 70
const CURVATURE = 0.25 // wie bei ReactFlow; höher = stärker gebogen

// Wandelt eine Seiten-Zahl (1-4) in einen festen Punkt auf dem Rand der Box um
const sidePoint = (cx, cy, halfW, halfH, side) => {
    switch (side) {
        case 1: return { x: cx - halfW, y: cy } // links Mitte
        case 2: return { x: cx + halfW, y: cy } // rechts Mitte
        case 3: return { x: cx, y: cy - halfH } // oben Mitte
        case 4: return { x: cx, y: cy + halfH } // unten Mitte
        default: return { x: cx, y: cy }
    }
}

// Gleiche Logik wie in ReactFlow (calculateControlOffset)
const controlOffset = (distance) =>
    distance >= 0
        ? 0.5 * distance
        : CURVATURE * 25 * Math.sqrt(-distance)

// Kontrollpunkt liegt in Richtung der Seite, an der die Linie angeschlossen ist
const controlPoint = (point, side, target) => {
    switch (side) {
        case 1: return { x: point.x - controlOffset(point.x - target.x), y: point.y }
        case 2: return { x: point.x + controlOffset(target.x - point.x), y: point.y }
        case 3: return { x: point.x, y: point.y - controlOffset(point.y - target.y) }
        case 4: return { x: point.x, y: point.y + controlOffset(target.y - point.y) }
        default: return point
    }
}

export const Connections = ({ nodes, sizes }) => {
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

    const getSize = (id) => sizes[id] || { width: FALLBACK_WIDTH, height: FALLBACK_HEIGHT }

    const paths = []

    nodes.forEach((node) => {
        const anschlussListe = node.anschluss || []

        anschlussListe.forEach((verbindung, i) => {
            const other = byId[verbindung.zu]
            if (!other) return

            const sizeMine = getSize(node.id)
            const sizeOther = getSize(other.id)

            const cxMine = node.position.x + sizeMine.width / 2
            const cyMine = node.position.y + sizeMine.height / 2
            const cxOther = other.position.x + sizeOther.width / 2
            const cyOther = other.position.y + sizeOther.height / 2

            const start = sidePoint(cxMine, cyMine, sizeMine.width / 2, sizeMine.height / 2, verbindung.meineSeite)
            const end = sidePoint(cxOther, cyOther, sizeOther.width / 2, sizeOther.height / 2, verbindung.andereSeite)

            const c1 = controlPoint(start, verbindung.meineSeite, end)
            const c2 = controlPoint(end, verbindung.andereSeite, start)

            const d = `M ${start.x},${start.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${end.x},${end.y}`

            paths.push(
    <g key={`${node.id}-${verbindung.zu}-${i}`} className="connection-path">
        
        <path
            d={d}
            fill="none"
            stroke="#000"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        
        <path
            d={d}
            fill="none"
            stroke="#3f3f3f"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </g>
)
        })
    })

    return (
        <div className="connections-layer">
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 1,
                    height: 1,
                    overflow: 'visible',
                    pointerEvents: 'none',
                }}
            >
                {paths}
            </svg>
        </div>
    )
}