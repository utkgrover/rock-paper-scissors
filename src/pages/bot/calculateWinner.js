export default function calculateWinner( botMove , playerMove ){
    if (botMove === playerMove){
        return "tie";
    } 

    if ((botMove === "stone" && playerMove === "paper") ||
        (botMove === "scissors" && playerMove === "stone") ||
        (botMove === "paper" && playerMove === "scissors")
    ){return "player"}
    
    return "bot";
}