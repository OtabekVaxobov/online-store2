export const buyHtml = `<div class="modal-content">
  <div class="form-buy">
    <div class="person-details">
      <h3 class="person-details__title">Personal details</h3>
      <div class="form-item__wrapper">
      <div class="person-name form-item">
        <input
          type="text"
          placeholder="Name"
          class="person-name__input person__input"
        />
      </div>
      <div class="error-message not-visible">Error. Example: Ivanov Ivan</div>
      </div>

      <div class="form-item__wrapper">
      <div class="person-phone-number form-item">
        <input
          type="text"
          placeholder="Phone number"
          class="person-phone-number__input person__input"
        />
      </div>
      <div class="error-message not-visible">Error. Example: +799999999</div>
      </div>

      <div class="form-item__wrapper">
      <div class="person-adress form-item">
        <input
          type="text"
          placeholder="Delivery address"
          class="person-adress__input person__input"
        />
      </div>
      <div class="error-message not-visible">Error. Example: Country YourCity YourStreet</div>
      </div>

      <div class="form-item__wrapper">
      <div class="person-email form-item">
        <input
          type="email"
          placeholder="E-mail"
          class="person-email__input person__input"
        />
      </div>
      <div class="error-message not-visible">Error. Example: some@gmail.com</div>
      </div>
    </div>
    <div class="card-details">
      <h3 class="card-details__title">Credit card details</h3>
      <div class="card-data">
      <div class="form-item__wrapper">
      <div class="card-data-number card-item">
          <img
            src="#"
            alt=""
            class="card-img"
          />
          <input
            placeholder="Card number"
            type="text"
            class="card-data-number__input card__input"
          />
        </div>
        <div class="error-message not-visible card-error">Error. 5555 4444 6666 0000</div>
        </div>

        <div class="card-data-cvv">
          <div class="form-item__wrapper">
          <div class="valid-data">
            <span>VALID:</span>
            <div class="valid-data-wrapper card-item">
              <input
                placeholder="mm/yy"
                type="text"
                class="valid-data__input card__input"
              />
            </div>
          </div>
          <div class="error-message not-visible card-error">Error. 01-25</div>
          </div>

          <div class="form-item__wrapper">
          <div class="cvv-data">
            <span>CVV:</span>
            <div class="vcvv-data-wrapper card-item">
              <input
                placeholder="Code"
                type="number"
                class="cvv-data__input card__input"
                min="0"
              />
            </div>
          </div>
          <div class="error-message not-visible card-error">Error. 999</div>
          </div>
        </div>
      </div>
    </div>
    <div class="buy-btn-wrapper">
      <button class="btn-buy btn_default">CONFIRM</button>
      <button class="btn-cancel btn_default">CANCEL</button>
    </div>
  </div>
</div>`;