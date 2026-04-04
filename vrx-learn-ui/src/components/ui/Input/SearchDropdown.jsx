import Input from './Input'

function SearchDropdown({
    value,
    onChange,
    results = [],
    onSelect,
    placeholder = "Search...",
    loading = true,
}) {
    return (
        <div className="relative">
            <Input
                icon="ic:twotone-search"
                paddingClass="py-2"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            {value && (
                <div className="absolute mt-1 w-full max-h-40 bg-background border shadow-md overflow-y-auto z-20">

                    {loading && <p className="p-2">Loading...</p>}

                    {!loading && results.length === 0 && (
                        <p className="p-2 text-gray-400">No results</p>
                    )}

                    {!loading &&
                        results.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => onSelect(item)}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {item.label}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default SearchDropdown;