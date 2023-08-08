//book
var containerLivros = document.querySelector(".container-livros");               //esse é o que esta vazio, que vai receber a clonagem
var containerLivrosRemove = document.querySelector(".container-livros-remove");  // esse fica dentro do containerLivros
var novoLivro = document.querySelector(".novo-livro");                           // esse é o que ja esta preenchido, que vamos clonar

//others
var img = document.querySelector(".img");
var btn = document.querySelector(".btn-buscar");
var campoDeBusca = document.querySelector(".input-busca");
var titulo = document.querySelector(".txt-titulo");
var autor = document.querySelector(".txt-autor");
var editora = document.querySelector(".txt-editora");
var dataPublicacao = document.querySelector(".txt-data-publicacao");
var txtAviso = document.querySelector(".txt-aguarde");
var link = document.querySelector(".link");
var animacao = document.querySelector(".loader");

///////////////////////////////////////////////////////////////////////

async function buscarLivro() {
  animacao.style.display = "block";
  containerLivrosRemove.innerHTML = "";

  if (campoDeBusca.value == "") {
    txtAviso.innerHTML = "Não há resultados para esta pesquisa.";
    animacao.style.display = "none";
  } else {
    txtAviso.innerHTML = "Carregando...";
    var busca = campoDeBusca.value;
    var url = `https://www.googleapis.com/books/v1/volumes?q=${busca}`;
    var req = await fetch(url);
    var json = await req.json();
    containerLivrosRemove.innerHTML = "";
    document.querySelector(".novo-livro").style.display = "flex";
  }

  if (json.totalItems > 1) {
    setTimeout(() => {
      animacao.style.display = "none";
      txtAviso.innerHTML = `Exibindo resultados para '${campoDeBusca.value}'`;

      //aqui começa a preencher a tela com os resultados do fetch
      for (var i = 0; i < json.items.length + 1; i++) {

        //origem do clonagem
        var newLivro = novoLivro.cloneNode(true); //esse é o que ja esta preenchido, que vamos clonar
        //destino do clonagem
        var add = containerLivrosRemove.append(newLivro);    

        document.querySelector(".container-livros-remove").children[0].style.display = "none";

        containerLivros.style.display = "flex"; //esse é o que esta vazio, que vai receber a clonagem

        containerLivrosRemove.style.display = "flex";      // esse fica dentro do containerLivros

        document.querySelector(".novo-livro").style.display = "flex";

        titulo.innerHTML = json.items[i].volumeInfo.title;
        titulo.setAttribute("href", json.items[i].volumeInfo.previewLink);
        autor.innerHTML = "Autor(es): " + json.items[i].volumeInfo.authors;
        editora.innerHTML = "Editora: " + json.items[i].volumeInfo.publisher;
        dataPublicacao.innerHTML = "Publicado em: " + json.items[i].volumeInfo.publishedDate;
        link.setAttribute("href", json.items[i].volumeInfo.previewLink);

        if (
          json.items[i].volumeInfo.readingModes.image == false &&
          json.items[i].volumeInfo.imageLinks
        ) {
          img.setAttribute(
            "src",
            json.items[i].volumeInfo.imageLinks.thumbnail
          );
        } else if (
          json.items[i].volumeInfo.readingModes.text == false &&
          json.items[i].volumeInfo.imageLinks
        ) {
          img.setAttribute(
            "src",
            json.items[i].volumeInfo.imageLinks.thumbnail
          );
        } else if (
          json.items[i].volumeInfo.readingModes.image == false &&
          json.items[i].volumeInfo.readingModes.text == false &&
          json.items[i].volumeInfo.imageLinks
        ) {
          img.setAttribute(
            "src",
            json.items[i].volumeInfo.imageLinks.thumbnail
          );
        } else {
          img.setAttribute("src", "imgs/sem-capa.png");
        }
      }
    }, 1000);
  }
}

async function addEventos() {
  btn.addEventListener("click", buscarLivro);

  window.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
      buscarLivro();
    }
  });
}

window.addEventListener("load", addEventos);
