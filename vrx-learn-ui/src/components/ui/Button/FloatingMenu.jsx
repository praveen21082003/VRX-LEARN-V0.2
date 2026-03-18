import { useState } from "react"
import Button from './Button'
import { useNavigate, useParams } from "react-router-dom";

export default function FloatingMenu({ actions = [] }) {

    const { courseSlug } = useParams();
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 flex lg:hidden text-black items-end gap-2 z-50">
            <div
                className={`flex flex-col items-end gap-2 transition-all duration-300 ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
                    }`}
            >
                {actions.map((item, index) => (
                    <div key={index}>
                        <Button buttonName={item.label} frontIconName={item.icon} rontIconHeight="24" frontIconWidth="24" textClass="text-black" bgClass="bg-background" className="shadow-md rounded-md px-1.5 py-2.5 text-text-muted text-h5 hover:bg-gray-100s" onClick={() => navigate(`/course/${courseSlug}/content/${item.path}`)} />
                    </div>
                ))}
            </div>
            <Button frontIconName="ic:baseline-plus" frontIconHeight="32" frontIconWidth="32" className="rounded-full h-15 w-15 p-3" onClick={() => setOpen(!open)} />
        </div>
    )
}