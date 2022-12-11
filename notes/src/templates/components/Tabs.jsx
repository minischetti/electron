import { useState } from "react"
import { CaretRight, CaretDown, X } from "phosphor-react"

export default Tabs = {
    List: ({ tabs }) => {
        const [activeTab, setActiveTab] = useState(-1)
        // close all tabs
        const closeTab = () => {
            setActiveTab(-1)
        }

        const Content = () => {
            if (activeTab !== -1 && tabs[activeTab]?.content) {
                return (
                    <div className="tab-content">
                        {tabs[activeTab]?.content}
                    </div>
                )
            }

            return null
        }
        return (
            <div className="tabs">
                <div className="tabs-header">
                    <div className="tabs-list">
                        {tabs.map((tab, index) => {
                            return (
                                <div key={index} className={`tab${activeTab === index ? " active" : ""}`} onClick={() => setActiveTab(index)}>
                                    {tab.icon}
                                    {tab.label}
                                    {activeTab === index ? <X /> : null}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Content />
            </div>
        )
    },
    Item: ({ children }) => {
        return (
            <div className="tab">
                {children}
            </div>
        )
    },
    Header: ({ children }) => {
        return (
            <div className="tab-header">
                {children}
            </div>
        )
    },
    Content: ({ children }) => {
        return (
            <div class="tab-content">
                {children}
            </div>
        )
    }
}
