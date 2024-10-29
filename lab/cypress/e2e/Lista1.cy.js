/// <reference = cypress>

const EMAIL = "mail";
const PASSWORD = "pass";
const WRONG_PASSWORD = "wrong pass";

describe("Testes do Lista 1", () => {
  it("Teste de login.", () => {
    cy.visit(
      "https://www.amazon.com.br/ap/signin?openid.pape.max_auth_age=900&openid.return_to=https%3A%2F%2Fwww.amazon.com.br%2Fgp%2Fyourstore%2Fhome%3Fpath%3D%252Fgp%252Fyourstore%252Fhome%26signIn%3D1%26useRedirectOnSuccess%3D1%26action%3Dsign-out%26ref_%3Dnav_AccountFlyout_signout&openid.assoc_handle=brflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0"
    );
    cy.get("#ap_email").type(EMAIL);
    cy.get("#continue").click();
    cy.get("#ap_password").type(PASSWORD);
    cy.get("#signInSubmit").click();
    cy.get("#nav-logo-sprites").should("exist");
  });

  it("Teste de falha de login.", () => {
    cy.visit(
      "https://www.amazon.com.br/ap/signin?openid.pape.max_auth_age=900&openid.return_to=https%3A%2F%2Fwww.amazon.com.br%2Fgp%2Fyourstore%2Fhome%3Fpath%3D%252Fgp%252Fyourstore%252Fhome%26signIn%3D1%26useRedirectOnSuccess%3D1%26action%3Dsign-out%26ref_%3Dnav_AccountFlyout_signout&openid.assoc_handle=brflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0"
    );
    cy.get("#ap_email").type(EMAIL);
    cy.get("#continue").click();
    cy.get("#ap_password").type(WRONG_PASSWORD);
    cy.get("#signInSubmit").click();
    cy.get("#nav-logo-sprites").should("not.exist");
  });

  it("Teste Adicionar item ao carrinho.", () => {
    // login
    cy.visit(
      "https://www.amazon.com.br/ap/signin?openid.pape.max_auth_age=900&openid.return_to=https%3A%2F%2Fwww.amazon.com.br%2Fgp%2Fyourstore%2Fhome%3Fpath%3D%252Fgp%252Fyourstore%252Fhome%26signIn%3D1%26useRedirectOnSuccess%3D1%26action%3Dsign-out%26ref_%3Dnav_AccountFlyout_signout&openid.assoc_handle=brflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0"
    );
    cy.get("#ap_email").type(EMAIL);
    cy.get("#continue").click();
    cy.get("#ap_password").type(PASSWORD);
    cy.get("#signInSubmit").click();
    cy.get("#nav-logo-sprites").should("exist");

    // esvazia o carrinho caso haja
    cy.get("#nav-cart").click();
    let text = "";

    cy.get("#sc-active-cart > div > div > div:nth-child(1) > h2").then(
      ($element) => {
        if ($element.length) {
          // Verifica se o elemento existe
          cy.wrap($element)
            .invoke("text")
            .then((t) => {
              text = t;
            });
        }
      }
    );

    if (text == "Carrinho de compras") {
      cy.get('[name^="submit.delete"]').each((btn) => {
        btn.click();
      });
    }

    // adicionar um item ao carrinho e verifica se foi adicionado
    cy.get("#twotabsearchtextbox").type("televisao");
    cy.get("#a-autoid-1-announce").click();
    cy.get("#nav-cart").click();
    cy.get("#sc-active-cart > div > div > div:nth-child(1) > h2").should(
      "contain.text",
      "Carrinho de compras"
    );
  });

  it("Teste Deletar item do carrinho.", () => {
    // login
    cy.visit(
      "https://www.amazon.com.br/ap/signin?openid.pape.max_auth_age=900&openid.return_to=https%3A%2F%2Fwww.amazon.com.br%2Fgp%2Fyourstore%2Fhome%3Fpath%3D%252Fgp%252Fyourstore%252Fhome%26signIn%3D1%26useRedirectOnSuccess%3D1%26action%3Dsign-out%26ref_%3Dnav_AccountFlyout_signout&openid.assoc_handle=brflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0"
    );
    cy.get("#ap_email").type(EMAIL);
    cy.get("#continue").click();
    cy.get("#ap_password").type(PASSWORD);
    cy.get("#signInSubmit").click();
    cy.get("#nav-logo-sprites").should("exist");

    // adicionar um item ao carrinho
    cy.get("#twotabsearchtextbox").type("televisao");
    cy.get("#a-autoid-1-announce").click();

    // remove o item
    cy.get("#nav-cart").click();
    cy.get('[name^="submit.delete"]').each((btn_delete) => {
      btn_delete.click();
    });

    cy.wait(500); // Espera 1 segundo

    cy.get("#sc-active-cart > div > div > div > h2").should(
      "contain.text",
      "Seu carrinho de compras da Amazon está vazio."
    );
  });

  it("Teste de filtro de categoria (preço).", () => {
    cy.visit(
      "https://www.amazon.com.br/ap/signin?openid.pape.max_auth_age=900&openid.return_to=https%3A%2F%2Fwww.amazon.com.br%2Fgp%2Fyourstore%2Fhome%3Fpath%3D%252Fgp%252Fyourstore%252Fhome%26signIn%3D1%26useRedirectOnSuccess%3D1%26action%3Dsign-out%26ref_%3Dnav_AccountFlyout_signout&openid.assoc_handle=brflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0"
    );
    cy.get("#ap_email").type(EMAIL);
    cy.get("#continue").click();
    cy.get("#ap_password").type(PASSWORD);
    cy.get("#signInSubmit").click();
    cy.get("#nav-logo-sprites").should("exist");

    // busca um item
    cy.get("#twotabsearchtextbox").type("televisao");
    cy.get("#s-result-sort-select_1").click();
    cy.get("#a-autoid-60 > span > input").click();
    cy.url().then((currentUrl) => {
      const url = new URL(currentUrl);
      url.searchParams.set("low-price", "4500.0"); // Altera ou adiciona o parâmetro
      cy.visit(url.toString()); // Visita a nova URL com o parâmetro alterado
    });
    cy.get(
      "#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(7) > div > div > span > div > div > div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small > div.a-section.a-spacing-none.a-spacing-top-small.s-price-instructions-style > div > div:nth-child(1) > a > span > span:nth-child(2) > span.a-price-whole"
    )
      .invoke("text")
      .then((texto) => {
        const valor = parseFloat(texto.replace(/[^\d.-]/g, "")); // Remove caracteres não numéricos
        expect(valor).to.be.greaterThan(4500); // Verifica se o valor é maior que 4000
      });
  });

  it("Teste de adicionar ao carrinho não logado.", () => {
    cy.visit("https://www.amazon.com.br");
    cy.get("#twotabsearchtextbox").type("televisao");
    cy.get("#a-autoid-1-announce").click();
    cy.get("#sc-buy-box-ptc-button > span > input").click();
    cy.get("#continue").should("exist");
  });
});
