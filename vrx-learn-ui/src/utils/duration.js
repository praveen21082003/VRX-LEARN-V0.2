
export function formatMinutes(minutes) {

    if (!Number.isFinite(minutes) || minutes <= 0) {
        return "0 mins"
    }

    //-----  converting minute to hours -----
    const hours = Math.floor(minutes / 60);
    // console.log("Hours",hours);

    // ----- left over minutes in the hours convertion -----
    const remainingMinutes = minutes % 60;
    // console.log("remining Minutes",remainingMinutes);


    // if Hours and Remaining Minutes
    if (hours > 0 && remainingMinutes > 0) {
        // console.log(`${hours}h ${remainingMinutes}mins`);
        return `${hours}h ${remainingMinutes}mins`

    // if only Hours No minutes 
    } if (hours > 0) {
        // console.log(`${hours}h`);
        return `${hours}h`
    }

    // if only remaining Minutes No hours 
    return `${remainingMinutes}mins`
}


