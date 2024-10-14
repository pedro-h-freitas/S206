/// <reference = cypress>

describe("Testes da criação, registro e login", () => {
  it.skip("Teste criação de usuario com sucesso", () => {
      cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
      cy.get('.btn-link').click()
      cy.get('#firstName').type("Pedro")
      cy.get('#Text1').type("Pedro")
      cy.get('#username').type("Pedro")
      cy.get('#password').type("Pedro")
      cy.get('.btn-primary').click()
      cy.get('.ng-binding').should("contain.text", "Registration successful")
  })

  it.skip("Teste criação de usuario com falha", () => {
      cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
      cy.get('.btn-link').click()
      cy.get('#firstName').type("Pedro")
      cy.get('#Text1').type("Pedro")
      cy.get('#username').type("Pedro")
      cy.get('.btn-primary').should("be.disabled")
  })

  it.skip("Teste de login com sucesso", () => {
      let infos = criarUser();
      cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
      cy.get('#username').type(infos[0])
      cy.get('#password').type(infos[1])
      cy.get('.btn-primary').click()
      cy.get('h1.ng-binding').should("contain.text", infos[0])
  })

  it("Teste de login com falha após deletar o user", () => {
      let infos = criarUser();
      cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
      // login
      cy.get('#username').type(infos[0])
      cy.get('#password').type(infos[1])
      cy.get('.btn-primary').click()

      // delete user
      cy.get('h1.ng-binding').should("contain.text", infos[0])
      cy.get('.ng-binding > a').click()
      cy.get('.btn').click()

      // login
      cy.get('#username').type(infos[0])
      cy.get('#password').type(infos[1])
      cy.get('.btn-primary').click()

      cy.get('.ng-binding').should("contain.text", "Username or password is incorrect")
  })
})

function criarUser() {
  let hora = new Date().getHours().toString()
  let minuto = new Date().getMinutes().toString()
  let seg = new Date().getSeconds().toString()
  let ID = hora + minuto + seg + "ID"
  let Senha = hora + minuto + seg + "senha"
  let infos = [ID, Senha]

  cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(ID)
  cy.get('#Text1').type(ID)
  cy.get('#username').type(ID)
  cy.get('#password').type(Senha)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should("contain.text", "Registration successful")
  return infos
}