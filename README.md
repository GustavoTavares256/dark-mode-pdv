# Codxis Dark Mode

Extensão para Chrome/Edge que alterna entre tema claro e escuro no sistema
https://web.codxis.api.br/sistema/.

## Instalação

1. Abra `chrome://extensions` (ou `edge://extensions`).
2. Ative o **Modo do desenvolvedor**.
3. Clique em **Carregar sem compactação** e selecione esta pasta.
4. Abra/recarregue o sistema Codxis.

## Uso

- **Ícone da extensão** → escolha *Claro* ou *Escuro*, ajuste intensidade e contraste.
- **Botão flutuante** (canto inferior direito da página) → alterna o tema com um clique.
- **Atalho** `Alt+Shift+D` → alterna o tema (pode ser alterado em `chrome://extensions/shortcuts`).

A preferência fica salva e vale para todas as abas do sistema.

## Como funciona

A página é invertida com filtro CSS (`invert` + `hue-rotate`), e imagens, vídeos
e iframes são invertidos de volta para manter as cores originais. Se algum
elemento ficar com cor estranha, adicione um seletor para ele em `dark.css`
na regra de "desfaz a inversão", ou aplique a classe `codxis-keep-colors`.
