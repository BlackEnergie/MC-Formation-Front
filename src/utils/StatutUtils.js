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
            style = "text-primary"
            break
        case "A_ATTRIBUER":
            style = "text-danger"
            break
        case "A_VENIR":
            style = "text-success"
            break
        case "PASSEE":
            style = "text-secondary"
    }
    return style;
}


