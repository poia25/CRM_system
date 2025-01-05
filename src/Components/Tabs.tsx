import React from 'react'

interface TabsProps {
    activeTab: "all" | "completed" | "pending";
    setActiveTab: (tab: "all" | "completed" | "pending") => void
    counts: { all: number | undefined, completed: number | undefined, pending: number | undefined }
  }

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab,counts}) => {
    return(<div className='tab'>
        <button
          onClick={() => setActiveTab("all")}
          style={{ fontWeight: activeTab === "all" ? "bold" : "normal" ,
                   color: activeTab === "all" ? "#1b8bd6" : "#727272",
                   borderBottom: activeTab === "all" ? "1.5px solid #1b8bd6" : "none"
          }}
        >
          Все<span>({counts.all})</span>
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          style={{ fontWeight: activeTab === "completed" ? "bold" : "normal",
            color: activeTab === "completed" ? "#1b8bd6" : "#727272",
            borderBottom: activeTab === "completed" ? "1.5px solid #1b8bd6" : "none",
           }}
        >
          в работе<span>({counts.completed})</span>
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          style={{ fontWeight: activeTab === "pending" ? "bold" : "normal",
            color: activeTab === "pending" ? "#1b8bd6" : "#727272",
                   borderBottom: activeTab === "pending" ? "1.5px solid #1b8bd6" : "none"
           }}
        >
          сделано<span>({counts.pending})</span>
        </button>
      </div>)
}

export default Tabs