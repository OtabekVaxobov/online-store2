
const headerComponent = (): string => {
 return `<header>
 <div class="page-header _main-container">
     <section class="header _container">
         <div class="search-form">
             <form class="input-form">
                 <input
                     class="input-area"
                     type="search"
                     name="q"
                     placeholder="Поиск по наименованию"
                     autofocus
                     autocomplete="off"
                 />
             </form>
         </div>
         <div class="basket">
             <img class="basket-img" src="./img/cart.svg" />
             <div class="basket-count">Количество:<span class="basket-count-span">0</span></div>
         </div>
     </section>
 </div>
</header>`
}

export default headerComponent;