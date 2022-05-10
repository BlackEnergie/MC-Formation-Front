export const statutToString = (statut) => {
    let str = statut;
    switch (statut) {
        case "DEMANDE" :
            str = "Demande"
            break
        case "A_ATTRIBUER":
            str = "À attribuer"
            break
        case "A_VENIR":
            str = "À venir"
            break
        case "PASSEE":
            str = "Passée"
    }
    return str;
}

export const statutToStyle = (statut) => {
    let style = "";
    switch (statut) {
        case "DEMANDE" :
            style = "#2B309B"
            break
        case "A_ATTRIBUER":
            style = "red"
            break
        case "A_VENIR":
            style = "green"
            break
        case "PASSEE":
            style = "grey"
    }
    return style;
}


