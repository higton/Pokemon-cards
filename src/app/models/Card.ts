export class Card {
    artist:string;
    attacks:[{name: String, damage: String, text: String, cost: [String]}];
    convertedRetreatCost: number;
    evolvesFrom:string;
    hp:string;
    id:string;
    imageUrl:string;
    imageUrlHiRes:String;
    name:string;
    rarity:string;
    retreatCost:[String];
    series:string;
    set:string;
    setCode:string;
    subtype:string;
    supertype:string;
    text: [String];
    types:[String];
    weaknesses:[{value: string}];
}
