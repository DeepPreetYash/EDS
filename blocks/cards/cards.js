import { createOptimizedPicture,fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders();
  const { fkey } = placeholders;
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    //code to create div and placeholder
    
    const newDiv = document.createElement('div');
    const textContent = document.createTextNode(fkey);
    newDiv.appendChild(textContent);
    li.append(newDiv);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
