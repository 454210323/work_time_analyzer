export const colorFromId = (id) => {
    var hue = hash(id) % 360;
    var saturation = 70;
    var lightness = 70;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const hash = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash);
}