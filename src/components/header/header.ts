// const HeaderComponent = (basket: HTMLElement | null): any => {
//     if( basket === null)  throw new Error("err");
const HeaderComponent = (cards: NodeList): any => {
        if( cards === null)  throw new Error("err");
        
    let update = 0;
    // let count = document.querySelectorAll('.product-card').forEach((text) => {
    //     // var result = document.getElementsByClassName("result")[0]; 
    //     console.log(text)    
    //     //    result.innerHTML += text.innerText + ' ';
    // })
let count = document.getElementById('basket-count-span') as HTMLElement
    cards.forEach(card => {
        // update += 1;
        card.addEventListener('click', (event) =>{
        // count.innerHTML = update.toString();
        console.log("1", event);
        // card.setAttribute('style', 'background-color: yellow;');
      });
    });
//  basket.addEventListener('click' , () =>{
//     update += 1;
//     // count.innerHTML = update.toString();
//     console.log(update)
//  });
}


export default HeaderComponent;