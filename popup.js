document.addEventListener('DOMContentLoaded', () => {
    const cats = document.querySelectorAll('.cat');
    cats.forEach(cat => {
      cat.addEventListener('click', function() {
        const catId = this.id;
        console.log(catId)

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "addCat", catId: catId});
        });
      });
    });
});
