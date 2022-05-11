
import { formation } from "./TableAccueil";

export function FiltreAccueil(data: formation[]){

    console.log(getAssoList(data))

}

function getAssoList(data: formation[]){
    const listAsso: string[] = [];

    data.map((data) => {
        listAsso.push(data.association.acronyme)
    })

    return listAsso.filter(function(ele , pos){
        return listAsso.indexOf(ele) == pos;
    }) 
}