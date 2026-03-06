export default function Pill({
    viewRole
}){
    return(
        <div className={`h-4 w-24 ${viewRole === "TRAINEE" ? 'bg-':'' }`}>

        </div>
    )
}