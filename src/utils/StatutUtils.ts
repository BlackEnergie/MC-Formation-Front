export enum Statut{
    DEMANDE = "Demande",
    A_ATTRIBUER = "À attribuer",
    A_VENIR = "À venir",
    PASSEE = "Passée"
}

export const optionsStatut =[
    {value: 'DEMANDE', label:'Demande'},
    {value: 'A_ATTRIBUER', label:'À attribuer'},
    {value: 'A_VENIR', label:'À venir'},
    {value: 'PASSEE', label:'Passée'},
]

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
            style = "#0D6EFD"
            break
        case "A_ATTRIBUER":
            style = "#DC3545"
            break
        case "A_VENIR":
            style = "#198754"
            break
        case "PASSEE":
            style = "#6C757D"
    }
    return style;
}


