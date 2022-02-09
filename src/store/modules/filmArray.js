
const list = [
   {
      id: 1,
      nameFilm: 'Первый фильм',
      description: 'Текст первого фильма',
      file: {},
      showPreview: false,
      imagePreview: "",
      list: [
         {
            id: 1,
            file: "",
            showPreview: false,
            imagePreview: "",
            text: "",
            url: "",
         },
      ],
      linkTreyler: 'ссылка на трейлер первого фильма',
      threeD: true,
      twooD: false,
      imax: false,
      url: 'url первого фильма',
      title: 'название первого фильма',
      keywords: 'ключевые слова первого фильма',
      seoDescription: 'описание первого фильма',
      urlMain: ''
   },
   {
      id: 2,
      nameFilm: 'Второй фильм',
      description: 'Текст второго фильма',
      file: {},
      showPreview: false,
      imagePreview: "",
      list: [
         {
            id: 1,
            file: "",
            showPreview: false,
            imagePreview: "",
            text: "",
            url: "",
         },
      ],
      linkTreyler: 'ссылка на трейлер второго фильма',
      threeD: false,
      twooD: true,
      imax: true,
      url: 'url второго фильма',
      title: 'название второго фильма',
      keywords: 'ключевые слова второго фильма',
      seoDescription: 'описание второго фильма',
      urlMain: ''
   }
]

export default{
   list
}