export const convertDateUTC = (dateLocal) => {
    const dateObject = new Date(dateLocal);
    return dateObject.getUTCFullYear() + '-' +
        ('0' + (dateObject.getUTCMonth() + 1)).slice(-2) + '-' +
        ('0' + dateObject.getUTCDate()).slice(-2) + ' ' +
        ('0' + dateObject.getUTCHours()).slice(-2) + ':' +
        ('0' + dateObject.getUTCMinutes()).slice(-2) + ':' +
        ('0' + dateObject.getUTCSeconds()).slice(-2);
};

export const formatDateTime = (dateLocal) => {
    const date = new Date(dateLocal);
    const zone = Intl.DateTimeFormat('es').resolvedOptions().locale;
    return date.toLocaleDateString(zone, { weekday: "long", month: "short", year: "numeric", day: "numeric" }) + " " +
        date.toLocaleTimeString(zone, { hour: 'numeric', minute: 'numeric', hour12: true })
}

export const formatDate = (dateLocal) => {
    const date = new Date(dateLocal);
    const zone = Intl.DateTimeFormat('es').resolvedOptions().locale;
    return date.toLocaleDateString(zone, { weekday: "long", month: "short", year: "numeric", day: "numeric" })
}

export const formatTime = (dateLocal) => {
    const date = new Date(dateLocal);
    const zone = Intl.DateTimeFormat('es').resolvedOptions().locale;
    return date.toLocaleTimeString(zone, { hour: 'numeric', minute: 'numeric', hour12: true })
}

export const formatDateTimeShort = (dateLocal) => {
    const date = new Date(dateLocal);
    const zone = Intl.DateTimeFormat('es').resolvedOptions().locale;
    return date.toLocaleDateString(zone, { month: "short", day: "numeric" }) + " " +
        date.toLocaleTimeString(zone, { hour: 'numeric', minute: 'numeric', hour12: true })
}