# Pijam{IN}ha — Frontend

Interface de usuário completa para o e-commerce fictício Pijam{IN}ha, desenvolvida em React + Vite.  
O frontend consome a API do Backend para fornecer uma experiência de compra dinâmica e interativa.  

> Observação: O backend deve estar rodando simultaneamente para que o frontend funcione corretamente.

---

## Funcionalidades

### Navegação e Descoberta
- Homepage com carrossel de promoções e feedbacks.  
- Página de Pijamas: listagem de produtos com paginação e filtros (gênero, tipo, estação).  
- Barra de pesquisa para encontrar pijamas pelo nome.  
- Página de detalhes para cada pijama com informações completas e seleção de tamanho.  

### Interação do Usuário
- Login e Registro com validação de formulários.  
- Página de Favoritos para salvar produtos.  
- Página de Feedback para envio de avaliações.  

### Fluxo de Compra
- Carrinho de compras: adicionar, remover e alterar quantidades.  
- Checkout em múltiplos passos: dados pessoais → endereço → pagamento.  
- Modal de pagamento com opções de:
  - Cartão de Crédito  
  - PIX (com desconto)  
- Modal de confirmação de compra ao finalizar o pedido.  

---

## Tecnologias Utilizadas

React + TypeScript  

## Como Rodar o Frontend

```bash
# 1. Clonar o repositório
git clone SEU_LINK_DO_REPOSITORIO_FRONTEND

# 2. Instalar dependências
npm install

# 3. Rodar servidor de desenvolvimento
npm run dev

O site estará acessível em: http://localhost:5173
