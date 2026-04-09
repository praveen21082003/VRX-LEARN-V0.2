import { Icon } from '@/components/ui'

export default function FullPageLoading({
    message = "Loading, please wait..."
}) {
    return (
        <div className="fixed inset-0 bg-main backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <img src="/VRX-logo.svg" className="h-10 animate-pulse" />
            <Icon
                name="mingcute:loading-3-fill"
                height="36"
                width="36"
                className="animate-spin items-center text-primary"
            />
            <p className="text-sm text-muted mt-3">{message}</p>
        </div>
    )
}