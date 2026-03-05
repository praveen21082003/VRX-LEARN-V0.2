function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-6 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`pb-2 text-h4 transition-colors ${
            activeTab === tab.value
              ? "border-b-2 border-primary text-primary  dark:text-background"
              : "text-muted hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
