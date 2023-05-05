const deg2rad = (deg: number): number => { 
    return deg * (Math.PI/180)
}

const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1);
    const a =  Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *  Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;
}

function testGetDistanceFromLatLonInKm() {
    const lat1 = 52.520008
    const lon1 = 13.404954
    const lat2 = 52.520008
    const lon2 = 13.404954
    console.log(getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2))
}

testGetDistanceFromLatLonInKm()