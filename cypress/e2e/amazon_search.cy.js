describe("Amazon search stared", () => {
    it('search for books', () => {
        cy.visit('https://www.amazon.com');

        cy.get('#searchDropdownBox').select('Books', {force:true});

        const searchTerm = 'Java';

        cy.get('#twotabsearchtextbox').type(searchTerm);

        cy.get('#nav-search-submit-button').click();


        const bookData = [];

        
        cy.get('.s-latency-cf-section.puis-card-border')
        .each($el => {
            const title = $el.find('.a-size-medium.a-color-base.a-text-normal').text();
            const isBestSeller = $el.find('.a-badge-text').text().includes('Best Seller');
          
            if(title){
                bookData.push({title, isBestSeller})
            }
        }).then(() => {
            cy.writeFile('books.json', bookData);
        })

        cy.visit('https://www.amazon.com/Head-First-Java-Kathy-Sierra/dp/0596009208/ref=sr_1_2?dchild=1&keywords=Java&qid=1610356790&s=books&sr=1-2');
        
        let productTitle = '';

        cy.get('#productTitle')
        .then(text => {
            productTitle = text;
        })
        bookData.map(el => {
            el.title == productTitle
            ? cy.log('There is wanted book in our list')
            : cy.log("There is no wanted book in our list")
        })
        
    })
})