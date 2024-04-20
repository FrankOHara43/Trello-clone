import { ReactSortable } from "react-sortablejs";
import { CardType } from "./Board";
import { SetStateAction } from "react";

type ColumnProps = {
    id: string;
    name: string;
    cards: CardType[];
    setCards: SetStateAction<any>;
};

export default function Column({id,name,cards,setCards}: ColumnProps) {

    function setCardsForColumn(sortedcards: CardType[], newcolumnId:string){

        setCards((prevCardsIds: CardType[]) => {
            const newCards = [...prevCardsIds];
            sortedcards.forEach((sortedCard:CardType, newIndex:number) => {
                const foundCard = newCards.find(newCard => newCard.id === sortedCard.id)
                if(foundCard){
                    console.log({card:foundCard.name,newIndex});
                    foundCard.index = newIndex;
                    foundCard.columnId = newcolumnId
                }
            });
            return newCards;
        });
    }
    return (
        <div className="w-36 bg-white shadow-sm rounded-md p-2">
            <h3>{name}</h3>
            <ReactSortable 
              list={cards} 
              setList={items => setCardsForColumn(items, id)}
              group="cards"
              className="min-h-12"
              ghostClass="opacity-40"
            
            >
            {cards.map(card => (
                <div key={card.id}className="border bg-white my-2 my-2 p-4 rounded-md">
                    <span>{card.name}</span>
                    </div>
            ))}
            </ReactSortable>
        </div>
    );
}