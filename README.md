# aula-01

## Rotas separadas por arquivos (de acordo com tipos)

## MVC

================
Autenticação
================

- Usuário precisa estar no DB (Model)
- Usuário precisa ter ID / password [ Usar criptografia! ]
- Precisa de uma rota para login
  - Cadastro
  - Lembrar senha
  - Logout
- gerar token de autenticação / refresh token

================
function makeid(length) {
var result = '';
var characters = '!"#$%&'()_+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^\_`abcdefghijklmnopqrstuvwxyz{|}~';
var charactersLength = characters.length;
for ( var i = 0; i < length; i++ ) {
result += characters.charAt(Math.floor(Math.random() _
charactersLength));
}
return result;
}

# console.log(makeid(12));

- verificar a autenticidade do token

================
Autorização
================
