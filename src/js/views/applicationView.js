class ApplicationView {
  _container = document.querySelector('.container');

  render(data) {
    const markup = this._generateMarkup(data);
    this._container.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup(card) {
    const markupString = card
      .map(card => {
        return `
          <div class="card">
            <i class="fa-solid fa-window-maximize card__icon btn--min-max btn--max"></i>
            <i class="fa-solid fa-window-minimize card__icon btn--min-max btn--min hidden"></i>
            <h2 class="card__title">${card.title}</h2>
            <div class="card__articles hidden">
            ${card.sections.map(this._generateMarkupArticles).join('')}
            </div>
          </div>
    `;
      })
      .join('');
    return markupString;
  }

  _generateMarkupArticles(article) {
    let descriptor = '';
    if (article.sectionArticles) {
      descriptor = article.sectionArticles
        .map(descriptor => {
          if (!descriptor.articleTitle) return;
          return `
          <li class="card__descriptor">
          ${
            descriptor.articleSource
              ? `<a class="card__descriptor-anchor" href="${descriptor.articleSource}" target="_blank">${descriptor.articleTitle}</a>`
              : `<p class="card__descriptor-title">${descriptor.articleTitle}</p>`
          }
          </li>`;
        })
        .join('');
    }

    let tooltip = '';
    if (article.sectionSummary.length > 0) {
      const tooltips = article.sectionSummary
        .map(summary => {
          return `<p class="tooltip_paragraph">${summary}</p>`;
        })
        .join('');

      tooltip = `
      <div class="tooltip">
        ${tooltips}
      </div>
      `;
    }

    return `
      <div class="card__article">
        <div class="card__article-wrapper">
          ${
            article.sectionSource
              ? `<a class="card__article-anchor" href="${article.sectionSource}" target="_blank">${article.sectionTitle}</a>`
              : `<p class="card__article-title">${article.sectionTitle}</p>`
          }
          ${tooltip}
        </div>
        <ul class="card__descriptors">
          ${descriptor}
        </ul>
      </div>
    `;
  }
}

export default new ApplicationView();
