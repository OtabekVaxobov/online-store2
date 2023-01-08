import { getElement } from '../general/general';
import { buyHtml } from './buy-page-html';
import { Cart } from '../counter/Cart';
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export class Buy {
  static render(): void {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.prepend(modal);
    modal.innerHTML = buyHtml;
    setPaymentSystemLogo(-1);
    Buy.addEventListeners();
    Buy.confirmClick();
  }

  static addEventListeners() {
    const cvvData = getElement('.cvv-data__input');
    if (cvvData instanceof HTMLInputElement) {
      cvvData.addEventListener('input', validCVV);
    }

    const validData = getElement('.valid-data__input');
    if (validData instanceof HTMLInputElement) {
      validData.addEventListener('input', validCardDate);
    }

    const validNumberCard = getElement('.card-data-number__input');
    if (validNumberCard instanceof HTMLInputElement) {
      validNumberCard.addEventListener('input', validCardNumber);
    }

    const validName = getElement('.person-name__input');
    if (validName instanceof HTMLInputElement) {
      validName.addEventListener('input', validPersonName)
    }

    const validAddres = getElement('.person-adress__input');
    if (validAddres instanceof HTMLInputElement) {
      validAddres.addEventListener('input', validPersonAddress)
    }

    const validEmail = getElement('.person-email__input');
    if (validEmail instanceof HTMLInputElement) {
      validEmail.addEventListener('input', validPersonEmail)
    }

    const validPhone = getElement('.person-phone-number__input');
    if (validPhone instanceof HTMLInputElement) {
      validPhone.addEventListener('input', validPersonPhone)
    }

    const btnCancel = getElement('.btn-cancel');
    if (btnCancel instanceof HTMLButtonElement) {
      btnCancel.addEventListener('click', () => {
        const modal = getElement('.modal');
        modal.remove();
      })
    }
  }

  static confirmClick() {
    const btnBuy = getElement('.btn-buy');
    if (!(btnBuy instanceof HTMLButtonElement)) return;
    btnBuy.addEventListener('click', () => {
      validCVV();
      validCardDate();
      validCardNumber();
      validPersonAddress();
      validPersonEmail();
      validPersonName();
      validPersonPhone();
      const personInputs = document.querySelectorAll('.person__input') as NodeList;
      const cardInputs = document.querySelectorAll('.card__input') as NodeList;
      if ( !(isValid(personInputs) && isValid(cardInputs)) ) {
        return;
      }
      const modal = getElement('.modal-content');
      modal.innerHTML = '<div class="order-complet">Thank you for your purchase!</div>';
      setTimeout(() => {
        Cart.clear();
        window.location.hash = '';
      }, 3000);
    })
  }
}

function isValid(nodeList: NodeList): boolean {
  
  for (let i = 0; i < nodeList.length; i += 1) {
    const node = nodeList[i] as HTMLInputElement;
    if ( node.classList.contains('invalid') ) return false;
    if ( !(node.classList.contains('valid')) ) return false;
  }
  return true;
}

function setValid(inputn: HTMLInputElement, valid: boolean): void {
  showError(inputn, valid);
  if (valid) {
    inputn.classList.remove('invalid');
    inputn.classList.add('valid');
  } else {
    inputn.classList.add('invalid');
    inputn.classList.remove('valid');
  }
}

function showError(inputn: HTMLInputElement, error: boolean): void {
  const wrapper = inputn.closest('.form-item__wrapper');
  if (!(wrapper instanceof HTMLDivElement)) return;
  const divError = wrapper.lastElementChild;
  if (!(divError instanceof HTMLDivElement)) return;
  if (error) {
    divError.classList.add('not-visible')
  } else {
    divError.classList.remove('not-visible')
  }
}

function isEmailValid(value: string): boolean {
  return EMAIL_REGEXP.test(value);
}

function setPaymentSystemLogo(firstDigit: number) {
  const cardImg = getElement('.card-img');
  if (cardImg instanceof HTMLImageElement) {
    if (firstDigit === 4) {
      cardImg.src = './assets/logo_visa.png';
    } else if (firstDigit === 5) {
      cardImg.src = './assets/logo-master-card.svg';
    } else if (firstDigit === 6) {
      cardImg.src = './assets/logo-unionpay.png';
    } else {
      cardImg.src = './assets/card-no-logo.webp';
    }
  }
}

function validCVV() {
  const cvvData = getElement('.cvv-data__input');
  if (cvvData instanceof HTMLInputElement) {
    cvvData.value = cvvData.value.replace(/[^0-9]/g,"").slice(0, 3);
    setValid(cvvData, cvvData.value.length === 3);
  }
}

function validCardDate() {
  const validData = getElement('.valid-data__input');
  if (validData instanceof HTMLInputElement) { 
    let fullData = validData.value;
    fullData = fullData.replace(/[^0-9]/g,"");
    let month = fullData.slice(0, 2);
    if ( Number(month[0]) > 1 ) month = '';
    if ( Number(month) > 12) month = month[0];
    const year = fullData.slice(2, 4);
    validData.value = (year === '') ? `${month}` : `${month}/${year}`;
    setValid(validData, year.length === 2 && month.length === 2);
  }
}

function validCardNumber() {
  const validNumberCard = getElement('.card-data-number__input');
  if (validNumberCard instanceof HTMLInputElement) {
    const number = validNumberCard.value.replace(/[^0-9]/g,"").slice(0, 16);
    validNumberCard.value = 
    `${number.slice(0, 4)} ${number.slice(4, 8)} ${number.slice(8, 12)} ${number.slice(12, 16)}`.trim();
    setValid(validNumberCard, number.length === 16);
    if (number.length > 0) setPaymentSystemLogo(Number(number[0]));
    console.log('card img change first number 4-6')
  }
}

function validPersonName() {
  const validName = getElement('.person-name__input');
  if (validName instanceof HTMLInputElement) {
  let validWord = 0;
  validName.value.split(' ').forEach((word) => {
    if (word !== '' && word[0] === word[0].toUpperCase()) {
      if (word.length > 2) validWord += 1;
    }
  })
  setValid(validName, validWord > 1);
  }
}

function validPersonPhone() {
  const validPhone = getElement('.person-phone-number__input');
  if (validPhone instanceof HTMLInputElement) {
    const number = validPhone.value.replace(/[^0-9]/g,"");
    validPhone.value = (number.length > 0) ? `+${number}` : '';
    setValid(validPhone, number.length >= 9);
  }
}

function validPersonAddress() {
  const validAddres = getElement('.person-adress__input');
  if (validAddres instanceof HTMLInputElement) {
    let validWord = 0;
    validAddres.value.split(' ').forEach((word) => {
      if (word !== '') {
        if (word.length > 4) validWord += 1;
      }
    })
    setValid(validAddres, validWord > 2);
  }
}

function validPersonEmail() {
  const validEmail = getElement('.person-email__input');
  if (validEmail instanceof HTMLInputElement) {
    setValid(validEmail, isEmailValid(validEmail.value));
  }
}