import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

/* import './index.css' */ /* Right now not in use bcs of the rebuild of the workspace and the new css structure. */
import { Workspace } from './workspace/workspace'
import { Connections } from './node/connections'
import { Node } from './node/node'
import { NewNode } from './node/newnode'
import { Sidepanel } from './node/sidepanel'
import defaultNodes from './data.json'
import { ExportJSON } from './in-export/export-json'
import { ImportJSON } from './in-export/import-json'
import Mode from "./workspace/mode.jsx";
import './css/csscolor/workspace.css'
import './css/csscolor/colorspalett.css'


const App = () => {
  //Von hier gemacht mit KI (local Storage)
  const [nodeList, setNodeList] = useState(() => {
    const savedNodes = localStorage.getItem('app_node_list_data')
    return savedNodes ? JSON.parse(savedNodes) : defaultNodes
  })

  const [selectedId, setSelectedId] = useState(null)
  const [sizes, setSizes] = useState({})

  const selectedNode = nodeList.find((n) => n.id === selectedId) || null

  useEffect(() => {
    localStorage.setItem('app_node_list_data', JSON.stringify(nodeList))
  }, [nodeList])

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'app_node_list_data' && e.newValue) {
        setNodeList(JSON.parse(e.newValue))
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])
  //bis hier

  const handleMove = (id, position) => {
    setNodeList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, position } : n))
    )
  }

  const handleResize = (id, size) => {
    setSizes((prev) => ({ ...prev, [id]: size }))
  }

  const handleSelect = (id) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }

  return (
    <>
      {/* Zoomable area: only nodes and connections */}
      <Workspace>
        <Connections nodes={nodeList} sizes={sizes} />
        {nodeList.map((node) => (
          <Node
            key={node.id}
            data={node}
            isSelected={node.id === selectedId}
            onMove={handleMove}
            onSelect={handleSelect}
            onResize={handleResize}
          />
        ))}
      </Workspace>

      
      <NewNode />
      <ExportJSON nodeList={nodeList} />
      <Sidepanel node={selectedNode} onClose={() => setSelectedId(null)} />
      <ImportJSON onImport={(importedNodes) => setNodeList(importedNodes)} />
      <button />
      <Mode />

        
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)