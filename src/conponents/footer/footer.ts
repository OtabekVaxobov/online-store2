import { getElement } from '../general/general';

export class Footer {
  static parentClass: string;

  static draw() {
    let parent: Element;
    if (Footer.parentClass === '') {
      parent = document.body;
    } else {
      parent = getElement(Footer.parentClass);
    }
    let footer = document.querySelector('.footer-main');
    if (footer !== null) return;
    footer = document.createElement('footer');
    footer.classList.add('footer-main');

    footer.innerHTML = html;
    parent.append(footer);

    const logo = getElement('.social-link__logo');
    if (logo instanceof HTMLImageElement) {
      logo.src = './assets/github.svg';
    }

    const logoRS = getElement('.logo-rs-school');
    if (logoRS instanceof HTMLImageElement) {
      logoRS.src = './assets/rs_school_js.svg';
    }
  }
}

const html = `<footer class="footer-main">
  <div class="footer-wrapper">
    <nav class="footer__nav nav-social">
      <a href="https://github.com/TerebinovSergey" class="social-link"
        ><img
          src="#"
          alt="GitHub"
          class="social-link__logo"
        />
        <span></span>
      </a>
    </nav>
    <span class="footer__year">2022</span>
    <a href="https://rs.school/js/" class="link-course"
      ><img
        src="#"
        alt="rs school"
        class="logo-rs-school"
    /></a>
  </div>
</footer>`;