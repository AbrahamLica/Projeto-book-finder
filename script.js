var btn = document.querySelector(".btn-buscar")
var campoDeBusca = document.querySelector(".input-busca")
var titulo = document.querySelector(".txt-titulo")
var autor = document.querySelector(".txt-autor")
var editora = document.querySelector(".txt-editora")
var dataPublicacao = document.querySelector(".txt-data-publicacao")
var livro = document.querySelector('.livro')
var containerLivros = document.querySelector('.container-livros')
var img = document.querySelector('.img')
var novoLivro = document.querySelector('.novo-livro')
var divRemover = document.querySelector('.container-livros-remove')
var teste = document.querySelector('.modelo-livro')
var txtAviso = document.querySelector(".txt-aguarde")
var link = document.querySelector(".link")
var animacao = document.querySelector(".loader")
///////////////////////////////////////////////////////////////////////


async function buscarLivro() {
  animacao.style.display = 'block'
  divRemover.innerHTML = await ''
  if (campoDeBusca.value == '') {
    txtAviso.innerHTML = await 'Não há resultados para esta pesquisa.'
    animacao.style.display = 'none'
  } else {
  txtAviso.innerHTML = await 'Carregando...'
  var busca = campoDeBusca.value
  var url = `https://www.googleapis.com/books/v1/volumes?q=${busca}`
  var req = await fetch(url)
  var json = await req.json()
  divRemover.innerHTML = await ''
  document.querySelector('.novo-livro').style.display = await 'flex'
  }

  if (json.totalItems > 1) {
     setTimeout(()  =>  {
      animacao.style.display = 'none'

      txtAviso.innerHTML = `Exibindo resultados para '${campoDeBusca.value}'`
      for (var i = 0; i < json.items.length + 1; i++) {
      var newLivro =  novoLivro.cloneNode(true)
      var add =  divRemover.append(newLivro)
      document.querySelector('.container-livros-remove').children[0].style.display =  'none'
      containerLivros.style.display =  'flex'
      divRemover.style.display =  'flex'
      document.querySelector('.novo-livro').style.display =  'flex'
      titulo.innerHTML =  json.items[i].volumeInfo.title
      titulo.setAttribute('href', json.items[i].volumeInfo.previewLink)
      autor.innerHTML = 'Autor(es): ' +  json.items[i].volumeInfo.authors
      editora.innerHTML = 'Editora: ' +  json.items[i].volumeInfo.publisher
      dataPublicacao.innerHTML = 'Publicado em: ' +  json.items[i].volumeInfo.publishedDate
      link.setAttribute('href', json.items[i].volumeInfo.previewLink)
      

      if (json.items[i].volumeInfo.readingModes.image == false && json.items[i].volumeInfo.imageLinks) {
        img.setAttribute('src', json.items[i].volumeInfo.imageLinks.thumbnail)
      } else if (json.items[i].volumeInfo.readingModes.text == false && json.items[i].volumeInfo.imageLinks) {
        img.setAttribute('src', json.items[i].volumeInfo.imageLinks.thumbnail)
      } else if (json.items[i].volumeInfo.readingModes.image == false && json.items[i].volumeInfo.readingModes.text == false && json.items[i].volumeInfo.imageLinks) {
        img.setAttribute('src', json.items[i].volumeInfo.imageLinks.thumbnail)
      } else {
        img.setAttribute('src', 'imgs/sem-capa.png')
      }
    }
    
    }, 1000);
  }   
}

async function addEventos() {
  btn.addEventListener('click', buscarLivro)

  window.addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
      buscarLivro()
    }
  })
}



window.addEventListener('load', addEventos)
