const HeaderComponent = (basket: HTMLElement | null): void => {
    if( basket === null)  throw new Error("err");
    
 basket.addEventListener('click' , () =>{
    let iter = 0
    iter++
 return iter
 });
}


export default HeaderComponent;